// pages/Home/Home.jsx (MODIFIED)
import React from "react";
// We don't need useAppContext here, as child components handle state
import HeroSection from "../../components/homeComponents/HeroSection";
import AboutUs from "../../components/homeComponents/AboutUs";
import FeaturesSection from "../../components/homeComponents/FeaturesSection";

// 🚨 VULNERABILITY FIX: Remove prop drilling (isLoggedIn, setIsLoggedIn)
function Home() {
  // 🚨 VULNERABILITY FIX: Remove unnecessary 'page' calculation
  // const page = isLoggedIn ? "Other" : "Home"; 

  return (
    // 🚨 VULNERABILITY FIX: Remove mt-20; it should be on the main wrapper (see App.jsx change)
    <div className="p-4"> 
      {/* 🚨 VULNERABILITY FIX: Remove prop drilling */}
      <HeroSection /> 
      <AboutUs />
      <FeaturesSection />
    </div>
  );
}

export default Home;