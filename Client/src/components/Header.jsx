// components/Header.jsx (HACKATHON-POLISHED)
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/AppContext"; // Context is the single source of truth
import AuthModal from "./AuthModal"; 
import logo from "./saathi-logo.png";

// Navigation links configuration
const defaultLinks = {
  loggedIn: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Journal", path: "/journal" },
  ],
  guest: [
    { name: "Home", path: "/" },
    { name: "Login", path: "#" }, // Login triggers modal
  ],
};

const Header = ({ navLinks = defaultLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Unified AuthModal state via context
  const { isLoggedIn, logout, isAuthModalOpen, openAuthModal, closeAuthModal } = useAppContext();

  // Redirect logic after login/logout
  useEffect(() => {
    if (isLoggedIn && location.pathname === "/") {
      navigate("/journal");
    } else if (
      !isLoggedIn &&
      (location.pathname === "/dashboard" || location.pathname === "/journal")
    ) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const toggleMenu = () => setMenuOpen((open) => !open);

  const handleLogout = () => {
    logout();
    navigate("/"); // Immediate page update on logout
  };

  // Links based on login state
  const links = isLoggedIn ? navLinks.loggedIn : navLinks.guest;
  const currentPageName = links.find((link) => link.path === location.pathname)?.name;

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
            {links.map((link) =>
              link.name === "Login" ? (
                <button
                  key={link.name}
                  onClick={openAuthModal} // Open modal via context
                  className="font-medium text-gray-700 hover:text-[#a1866f] transition"
                  aria-haspopup="dialog"
                  aria-controls="auth-modal"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium text-gray-700 hover:text-[#a1866f] transition ${
                    currentPageName === link.name ? "font-bold text-[#a1866f]" : ""
                  }`}
                  aria-current={currentPageName === link.name ? "page" : undefined}
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

          {/* Mobile menu button */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white shadow-md px-4 py-4 space-y-3 z-50" role="menu">
            {links.map((link) =>
              link.name === "Login" ? (
                <button
                  key={link.name}
                  onClick={() => {
                    openAuthModal();
                    setMenuOpen(false);
                  }}
                  className="block text-gray-700 font-medium hover:text-[#a1866f] w-full text-left"
                  aria-haspopup="dialog"
                  aria-controls="auth-modal"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700 font-medium hover:text-[#a1866f]"
                  aria-current={currentPageName === link.name ? "page" : undefined}
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

      {/* Auth Modal (controlled via context) */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};

export default Header;
