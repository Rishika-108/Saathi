// context/AppContext.jsx (MODIFIED)
import React, { createContext, useState, useContext } from "react";

// 1️⃣ Provide a full default structure for defense and type hinting
const AppContext = createContext({
  isLoggedIn: false,
  // Ensure currentUser is nullable or has a structure
  currentUser: null, 
  journalEntries: [],
  login: () => {},
  logout: () => {},
  addJournalEntry: () => {},
});

// 2️⃣ Create Provider
export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Add an 'id' for stability and better mock data
  const [currentUser, setCurrentUser] = useState({ id: 'u-001', name: "Omkar" });
  const [journalEntries, setJournalEntries] = useState([]);

  // Actions
  const login = (user) => {
    // 🚨 VULNERABILITY FIX: Remove the hardcoded fallback user from the action
    if (!user || !user.id) return console.error("Login requires a valid user object.");
    
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const addJournalEntry = (entry) => {
    setJournalEntries((prev) => [entry, ...prev]); // newest first
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        journalEntries,
        login,
        logout,
        addJournalEntry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 3️⃣ Custom hook for easier usage
export const useAppContext = () => useContext(AppContext);