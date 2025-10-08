// App.jsx (MODIFIED)
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout"; // ✨ New import

// Imports for pages (Good candidates for lazy loading, but keeping as is for now)
import Home from "./pages/Home/Home";
import Journal from "./pages/Journaling/Journal";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <AppProvider>
      {/* 🚨 VULNERABILITY FIX: Remove Header, Footer, and main wrapper */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add a 404 route for robustness */}
          <Route path="*" element={<div>404: Not Found</div>} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default App;