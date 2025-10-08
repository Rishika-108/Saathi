import React from "react";

function AboutUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          About Saathi
        </h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Saathi is a self-reflection and productivity platform that helps you
          become more self-aware. By analyzing your journaling patterns and
          productivity data, the system detects cognitive biases and emotional
          triggers, turning insights into a gamified self-improvement journey.
        </p>
        <p className="text-gray-600 text-md md:text-lg max-w-3xl mx-auto">
          Our goal is to encourage consistent journaling, offer meaningful
          insights, and motivate you to track your progress — making personal
          growth both engaging and rewarding.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
