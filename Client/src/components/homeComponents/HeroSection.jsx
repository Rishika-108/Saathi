// components/homeComponents/HeroSection.jsx (MODIFIED)
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext"; // 👈 Access global state
import backgroundImage from "./Herobackground.jpeg";

// 1. Removed setIsLoggedIn prop, relies on context
function HeroSection() {
  const navigate = useNavigate();
  const { login } = useAppContext(); // 👈 Use the global login action

  const handleStartJournaling = () => {
    // 2. Use the global 'login' action
    login({ id: 'temp-guest', name: "Guest" }); 
    navigate("/journal");
  };

  return (
    <section
      // 3. IMPORTANT: Set min-h-[calc(100vh-80px)] to ensure the fixed header doesn't cover the top of the section
      className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 4. Overlay for better text visibility (z-index is 0 implicitly) */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* 5. Content: Ensures content is stacked above the overlay */}
      <div className="relative z-10 max-w-3xl px-4 py-10 sm:py-0"> {/* Added padding for small screens */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Reflect, Analyze, Improve
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Discover your emotional patterns and cognitive biases through journaling. 
          Make self-awareness a daily habit.
        </p>
        <button
          onClick={handleStartJournaling}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow-lg transition"
        >
          Start Journaling
        </button>

        {/* Optional illustration image - Removed for clean code and performance */}
      </div>
    </section>
  );
}

export default HeroSection;