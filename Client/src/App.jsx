import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journaling/Journal";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {/* Header will dynamically update based on login */}
      <Header
        page={isLoggedIn ? "Other" : "Home"}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <main className="mt-20">
        <Routes>
          {/* Pass setIsLoggedIn to Home for Hero CTA */}
          <Route
            path="/"
            element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/journal" element={<Journal />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer dynamically updates links based on login */}
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
