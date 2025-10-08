import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "./saathi-logo.png";

function Footer({ isLoggedIn }) {
  const navLinks = isLoggedIn
    ? [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Journal", path: "/journal" },
        { name: "Profile", path: "/profile" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Login", path: "#" },
      ];

  return (
    <footer className="bg-gradient-to-b from-[#f8f5f2] to-[#ebe3dc] text-[#4a3f35] shadow-inner border-t border-[#d8c9b8] mt-0">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand Section */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Saathi Logo" className="w-10 h-10 object-contain rounded-full" />
          <span className="text-2xl font-bold font-serif tracking-wide">Saathi</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-5 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group hover:text-[#a1866f] transition"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#a1866f] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-5 text-xl">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a1866f] transition-transform transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a1866f] transition-transform transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a1866f] transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a1866f] transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#d8c9b8] py-4 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">Saathi</span>. All rights reserved.
        </p>
        <p className="text-xs mt-1 text-gray-500">
          Made with ❤️ during Hackathon 2025
        </p>
      </div>
    </footer>
  );
}

export default Footer;
