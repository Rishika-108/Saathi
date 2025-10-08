// components/AuthModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    login: contextLogin,
    register: contextRegister,
    isLoggedIn
  } = useAppContext();

  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens or mode changes
  useEffect(() => {
    setFormData({ email: "", username: "", password: "", confirmPassword: "" });
    setError("");
  }, [isAuthModalOpen, isLoginMode]);

  // Focus trap & ESC close
  useEffect(() => {
    if (isAuthModalOpen && modalRef.current) modalRef.current.focus();
    const handleEsc = (e) => e.key === "Escape" && closeAuthModal();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isAuthModalOpen, closeAuthModal]);

  // Auto-redirect after login/register
  useEffect(() => {
    if (isLoggedIn) {
      closeAuthModal();
      navigate("/journal");
    }
  }, [isLoggedIn, navigate, closeAuthModal]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, username, password, confirmPassword } = formData;

    // Client-side validation
    if (isLoginMode) {
      if (!password || (!username && !email)) {
        setError("Please enter your password and username/email.");
        setLoading(false);
        return;
      }
    } else {
      if (!email || !username || !password || !confirmPassword) {
        setError("Please fill in all registration fields.");
        setLoading(false);
        return;
      } else if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }
    }

    try {
      if (isLoginMode) {
        const user = await contextLogin(username || email, password);
        if (!user) setError("Invalid credentials.");
      } else {
        const user = await contextRegister(email, username, password);
        if (!user) setError("Registration failed. Email may already exist.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={closeAuthModal}
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={closeAuthModal}
          aria-label="Close authentication modal"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-bold mb-2 text-center text-[#4a3f35] font-serif">
          {isLoginMode ? "Welcome Back!" : "Join Saathi"}
        </h2>

        <p className="text-center text-sm text-gray-600 mb-6">
          {isLoginMode ? "New user? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLoginMode(prev => !prev)}
            className="text-[#a1866f] hover:text-[#8b715b] font-semibold transition"
          >
            {isLoginMode ? "Register" : "Login"}
          </button>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginMode && (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#a1866f] transition"
              required
              disabled={loading}
            />
          )}

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder={isLoginMode ? "Username or Email" : "Username (For Display)"}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#a1866f] transition"
            required
            disabled={loading}
            autoFocus
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#a1866f] transition"
            required
            disabled={loading}
          />

          {!isLoginMode && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#a1866f] transition"
              required
              disabled={loading}
            />
          )}

          {error && <span className="text-red-500 text-sm">{error}</span>}

          <button
            type="submit"
            className="w-full bg-[#a1866f] text-white py-3 rounded-xl font-semibold hover:bg-[#8b715b] transition-all"
            disabled={loading}
          >
            {loading ? "Processing..." : isLoginMode ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
