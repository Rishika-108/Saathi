import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./Herobackground.jpeg"; // Local background image

function HeroSection({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleStartJournaling = () => {
    setIsLoggedIn(true); // simulate login
    navigate("/journal"); // navigate to Journaling page
  };

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 max-w-3xl px-4 ">
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

        {/* Optional illustration image */}
        <div className="mt-10">
          <img
            src="https://images.unsplash.com/photo-1581091215365-81cb192d9a14?auto=format&fit=crop&w=800&q=80"
            alt="Journaling Illustration"
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
