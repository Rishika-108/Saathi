import React from "react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
      {/* Icon/Image */}
      <img src={icon} alt={title} className="h-16 w-16 mb-4" />

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
