import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ page, isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();

  const isHomePage = page === "Home";

  const navLinks = isHomePage
    ? [
        { name: "Home", path: "/" },
        { name: "Login", path: "/journal" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Journal", path: "/journal" },
        { name: "Profile", path: "/profile" },
      ];

  const handleLoginClick = () => {
    setIsLoggedIn(true); // update login state
    navigate("/journal"); // redirect to Journal
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 ">
          <img src="/logo.svg" alt="Saathi Logo" className="h-8 w-8" />
          <Link to="/" className="text-2xl font-semibold text-gray-800">
            <b>Saathi</b>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => {
                if (link.name === "Login") handleLoginClick();
                else navigate(link.path);
              }}
            >
              {link.name}
            </button>
          ))}

          {!isHomePage && (
            <div className="ml-4">
              <img
                src="/user-icon.svg"
                alt="User Profile"
                className="h-8 w-8 rounded-full border cursor-pointer"
              />
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden flex items-center text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-center py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => {
                  toggleMenu();
                  if (link.name === "Login") handleLoginClick();
                  else navigate(link.path);
                }}
              >
                {link.name}
              </button>
            ))}

            {!isHomePage && (
              <img
                src="/user-icon.svg"
                alt="User Profile"
                className="h-10 w-10 rounded-full border cursor-pointer mt-2"
                onClick={toggleMenu}
              />
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
