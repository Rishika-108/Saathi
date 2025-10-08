import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "./saathi-logo.png";

// Navigation links can be passed as props for full dynamic control
const defaultLinks = {
  loggedIn: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Journal", path: "/journal" },
  ],
  guest: [
    { name: "Home", path: "/" },
    { name: "Login", path: "#" },
  ],
};

// Simulate async authentication (replace with real API)
const authenticateUser = async (username, password) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));
  // Replace with real authentication logic
  return username === "admin" && password === "password";
};

const Header = ({
  page,
  isLoggedIn,
  setIsLoggedIn,
  navLinks = defaultLinks,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // Accessibility: Trap focus in modal
  useEffect(() => {
    if (loginModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [loginModalOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setLoginModalOpen(false);
    };
    if (loginModalOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [loginModalOpen]);

  // Trap focus inside modal
  useEffect(() => {
    if (!loginModalOpen) return;
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;
    const firstElement = modal?.querySelectorAll(focusableElements)[0];
    const elements = modal?.querySelectorAll(focusableElements);
    const lastElement = elements?.[elements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (!elements) return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    modal?.addEventListener("keydown", handleTab);
    return () => modal?.removeEventListener("keydown", handleTab);
  }, [loginModalOpen]);

  const toggleMenu = () => setMenuOpen((open) => !open);

  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
    if (!loginForm.username || !loginForm.password) {
      setLoginError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    // Simulate async authentication
    const success = await authenticateUser(loginForm.username, loginForm.password);
    console.log("Login success:", success); // Debug line
    setLoading(false);
    if (success) {
      setIsLoggedIn(true);
      setLoginModalOpen(false); // Close the popup
      setLoginForm({ username: "", password: "" });
      navigate("/journal"); // Navigate to /journal
    } else {
      setLoginError("Invalid credentials.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: "", password: "" });
    // Example: localStorage.removeItem("token");
    navigate("/");
  };

  const links = isLoggedIn ? navLinks.loggedIn : navLinks.guest;

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Saathi Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-[#4a3f35] font-serif">Saathi</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 items-center" aria-label="Main navigation">
            {links.map((link, idx) =>
              link.name === "Login" ? (
                <button
                  key={idx}
                  onClick={() => setLoginModalOpen(true)}
                  className="font-medium text-gray-700 hover:text-[#a1866f] transition"
                  aria-haspopup="dialog"
                  aria-controls="login-modal"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={idx}
                  to={link.path}
                  className={`font-medium text-gray-700 hover:text-[#a1866f] transition ${
                    page === link.name ? "text-[#a1866f]" : ""
                  }`}
                  aria-current={page === link.name ? "page" : undefined}
                >
                  {link.name}
                </Link>
              )
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-[#a1866f] text-white rounded-lg hover:bg-[#8b715b] transition"
                aria-label="Logout"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 text-2xl"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-white shadow-md px-4 py-4 space-y-3 z-50"
            role="menu"
          >
            {links.map((link, idx) =>
              link.name === "Login" ? (
                <button
                  key={idx}
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="block text-gray-700 font-medium hover:text-[#a1866f] w-full text-left"
                  aria-haspopup="dialog"
                  aria-controls="login-modal"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={idx}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700 font-medium hover:text-[#a1866f]"
                  aria-current={page === link.name ? "page" : undefined}
                >
                  {link.name}
                </Link>
              )
            )}

            {isLoggedIn && (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full mt-2 px-4 py-2 bg-[#a1866f] text-white rounded-lg hover:bg-[#8b715b]"
                aria-label="Logout"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* Login Modal */}
      {loginModalOpen && (
        <div
          id="login-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setLoginModalOpen(false)}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative mx-4"
            onClick={(e) => e.stopPropagation()}
            tabIndex={0}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
              onClick={() => setLoginModalOpen(false)}
              aria-label="Close login modal"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center text-[#4a3f35] font-serif">
              Welcome Back!
            </h2>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleInputChange}
                placeholder="Email or Username"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#a1866f] focus:ring-1 focus:ring-[#a1866f] transition"
                required
                autoFocus
                aria-label="Email or Username"
                disabled={loading}
              />
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#a1866f] focus:ring-1 focus:ring-[#a1866f] transition"
                required
                aria-label="Password"
                disabled={loading}
              />
              {loginError && (
                <span className="text-red-500 text-sm">{loginError}</span>
              )}
              <button
                type="submit"
                className="w-full bg-[#a1866f] text-white py-3 rounded-xl font-semibold hover:bg-[#8b715b] transition-all"
                aria-label="Login"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Spacer only if the page doesn’t already have padding */}
<div className={`${page === "Home" ? "h-16 md:h-20" : "h-0"}`}></div>
    </>
  );
};

export default Header;
