import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import backgroundImage from "./Herobackground.jpeg";

function HeroSection() {
  const navigate = useNavigate();
  const { isLoggedIn, openAuthModal } = useAppContext();

  const handleStartJournaling = () => {
    if (isLoggedIn) {
      navigate("/journal");
    } else {
      openAuthModal(); // Open login/register modal
    }
  };

  return (
    <section
      className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 max-w-3xl px-4 py-10 sm:py-0">
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
      </div>
    </section>
  );
}

export default HeroSection;
