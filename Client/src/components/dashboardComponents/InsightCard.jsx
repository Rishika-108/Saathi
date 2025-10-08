import React from "react";

function InsightCard({ entry }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition">
      {/* Title and Date */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{entry.title}</h3>
        <span className="text-sm text-gray-500">{entry.date}</span>
      </div>

      {/* Detected emotions */}
      {entry.emotions && entry.emotions.length > 0 && (
        <div className="mb-2">
          <h4 className="text-sm font-medium text-gray-700">Emotions:</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            {entry.emotions.map((emotion, idx) => (
              <li key={idx}>{emotion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Detected cognitive biases */}
      {entry.biases && entry.biases.length > 0 && (
        <div className="mb-2">
          <h4 className="text-sm font-medium text-gray-700">Cognitive Biases:</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            {entry.biases.map((bias, idx) => (
              <li key={idx}>{bias}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Optional notes */}
      {entry.notes && (
        <div>
          <h4 className="text-sm font-medium text-gray-700">Key Triggers:</h4>
          <p className="text-gray-600 text-sm">{entry.notes}</p>
        </div>
      )}
    </div>
  );
}

export default InsightCard;
