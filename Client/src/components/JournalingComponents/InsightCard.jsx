import React from "react";

const InsightCard = ({ entry, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{entry.title}</h2>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-4">{entry.date}</p>

        {/* Description */}
        {entry.description && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Description</h3>
            <p className="text-gray-600 leading-relaxed">{entry.description}</p>
          </div>
        )}

        {/* AI Insights */}
        {entry.issue && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Issue</h3>
            <p className="text-gray-600">{entry.issue}</p>
          </div>
        )}

        {entry.scene && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Scene</h3>
            <p className="text-gray-600">{entry.scene}</p>
          </div>
        )}

        {entry.solution && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Solution</h3>
            <p className="text-gray-600">{entry.solution}</p>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md font-semibold transition"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
