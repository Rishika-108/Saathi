import React from "react";
import HeroSection from "../../components/homeComponents/HeroSection";
import AboutUs from "../../components/homeComponents/AboutUs";
import FeaturesSection from "../../components/homeComponents/FeaturesSection";

function Home({ isLoggedIn , setIsLoggedIn }) {
  const page = isLoggedIn ? "Other" : "Home";

  return (
    <div className="mt-20 p-4">
      <HeroSection setIsLoggedIn={setIsLoggedIn} />
      <AboutUs/>
      <FeaturesSection />
    </div>
  );
}

export default Home;
