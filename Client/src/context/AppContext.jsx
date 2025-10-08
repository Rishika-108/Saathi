// context/AppContext.jsx
import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("saathi_user"));
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("saathi_user");
    return user ? JSON.parse(user) : null;
  });
  const [journalEntries, setJournalEntries] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const API_BASE = "http://localhost:5000/api"; // Update as needed

  // ----- Auth -----
  const login = async (identifier, password) => {
    try {
      const res = await axios.post(`${API_BASE}/user/login`, { identifier, password });
      const user = res.data;

      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("saathi_user", JSON.stringify(user));

      return user;
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Check your credentials.";
      console.error("Login error:", msg);
      throw new Error(msg);
    }
  };

  const register = async (email, username, password) => {
    try {
      const res = await axios.post(`${API_BASE}/user/register`, { email, username, password });
      const user = res.data;

      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem("saathi_user", JSON.stringify(user));

      return user;
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Email may already exist.";
      console.error("Register error:", msg);
      throw new Error(msg);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setJournalEntries([]);
    localStorage.removeItem("saathi_user");
  };

  const fetchProfile = async () => {
    if (!currentUser) return null;
    try {
      const res = await axios.get(`${API_BASE}/user/profile`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch profile:", err.response?.data?.message || err.message);
      return null;
    }
  };

  // ----- Journals -----
  const addJournalEntry = async (title, description) => {
    if (!currentUser) throw new Error("User not logged in.");
    try {
      const res = await axios.post(
        `${API_BASE}/journal/create`,
        { title, description },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      setJournalEntries(prev => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add journal entry.";
      console.error(msg);
      throw new Error(msg);
    }
  };

  const fetchAllJournals = async () => {
    if (!currentUser) return [];
    try {
      const res = await axios.get(`${API_BASE}/journal/alljournals`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setJournalEntries(res.data);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to fetch journals.";
      console.error(msg);
      return [];
    }
  };

  const fetchJournalById = async (id) => {
    if (!currentUser) return null;
    try {
      const res = await axios.get(`${API_BASE}/journal/specificJournal/${id}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      return res.data;
    } catch (err) {
      console.error("Failed to fetch journal by ID:", err.response?.data?.message || err.message);
      return null;
    }
  };

  const analyzeJournal = async (id) => {
    if (!currentUser) return null;
    try {
      const res = await axios.post(`${API_BASE}/journal/analysis/${id}`, {}, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      return res.data; // { issue, scene, solution }
    } catch (err) {
      console.error("Journal analysis failed:", err.response?.data?.message || err.message);
      return null;
    }
  };

  // ----- Auth Modal -----
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        journalEntries,
        login,
        register,
        logout,
        fetchProfile,
        addJournalEntry,
        fetchAllJournals,
        fetchJournalById,
        analyzeJournal,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
