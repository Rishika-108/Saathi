import React from "react";
import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  const features = [
    {
      icon: "https://img.icons8.com/fluency/96/000000/artificial-intelligence.png",
      title: "AI Insight",
      description: "Analyze your journal entries to detect emotions and cognitive biases.",
    },
    {
      icon: "https://img.icons8.com/fluency/96/000000/mood.png",
      title: "Emotional Tracking",
      description: "Track your mood patterns over time with easy-to-read visualizations.",
    },
    {
      icon: "https://img.icons8.com/fluency/96/000000/trophy.png",
      title: "Gamified Progress",
      description: "Earn rewards and track your personal growth through gamified insights.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Our Features</h2>
        <p className="text-gray-600 mt-4">
          Explore the key features of Saathi that help you become more self-aware and productive.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
