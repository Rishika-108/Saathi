import { Link } from "react-router-dom";

function Footer({ isLoggedIn }) {
  // Navigation links change based on login state
  const navLinks = isLoggedIn
    ? [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Journal", path: "/journal" },
        { name: "Profile", path: "/profile" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Login", path: "/journal" },
      ];

  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / App Name */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img src="/logo.svg" alt="Saathi Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold">Saathi</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4 mb-4 md:mb-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons (optional) */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <img src="/icons/twitter.svg" alt="Twitter" className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm py-2 border-t border-gray-200">
        &copy; {new Date().getFullYear()} Saathi. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
