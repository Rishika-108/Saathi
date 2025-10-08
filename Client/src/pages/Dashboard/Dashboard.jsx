import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InsightCard from "../../components/dashboardComponents/InsightCard";

// Mock journal entries
const mockJournalEntries = [
  {
    title: "Morning Reflection",
    date: "2025-10-08",
    emotions: ["Happy", "Motivated"],
    biases: ["Confirmation Bias"],
    notes: "Felt confident after morning walk, ready to tackle tasks.",
  },
  {
    title: "Evening Thoughts",
    date: "2025-10-07",
    emotions: ["Anxious", "Thoughtful"],
    biases: ["Negativity Bias"],
    notes: "Overthinking about work tasks and deadlines.",
  },
  {
    title: "Afternoon Break",
    date: "2025-10-06",
    emotions: ["Relaxed"],
    biases: [],
    notes: "Enjoyed a short walk outside and felt refreshed.",
  },
  {
    title: "Team Meeting Reflection",
    date: "2025-10-05",
    emotions: ["Frustrated", "Alert"],
    biases: ["Self-serving Bias"],
    notes: "Felt frustrated during the meeting but realized some points were valid.",
  },
  {
    title: "Evening Journal",
    date: "2025-10-04",
    emotions: ["Calm", "Grateful"],
    biases: ["Availability Bias"],
    notes: "Reflecting on positive interactions today; grateful for support from friends.",
  },
  {
    title: "Productivity Check",
    date: "2025-10-03",
    emotions: ["Motivated", "Focused"],
    biases: ["Overconfidence Bias"],
    notes: "Completed all planned tasks; need to pace myself better next time.",
  },
  {
    title: "Weekend Reflection",
    date: "2025-10-02",
    emotions: ["Relaxed", "Happy"],
    biases: [],
    notes: "Had a relaxing weekend, spent quality time with family.",
  },
  {
    title: "Stressful Afternoon",
    date: "2025-10-01",
    emotions: ["Stressed", "Anxious"],
    biases: ["Catastrophizing"],
    notes: "Workload seemed overwhelming; practiced breathing exercises to calm down.",
  },
];

function Dashboard({ isLoggedIn, setIsLoggedIn }) {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleCard = (index) => {
    setExpandedIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1 mt-20 mb-20 max-w-full px-4 gap-8">
        {/* Left Column */}
        <div
          className="flex-1 flex flex-col"
          style={{
            maxHeight: "calc(4 * 120px + 3 * 16px + 40px)", // 4 cards + spacing + extra margin
            overflowY: "auto",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4">Your Journals</h2>

          {mockJournalEntries.map((entry, idx) => (
            <div key={idx} className="mb-4">
              {/* Vertical Card */}
              <div
                onClick={() => toggleCard(idx)}
                className={`w-full bg-blue-100 rounded-lg p-4 cursor-pointer hover:bg-blue-200 transition ${
                  expandedIndices.includes(idx) ? "bg-blue-300" : ""
                }`}
                style={{ height: "120px" }}
              >
                <h3 className="font-semibold">{entry.title}</h3>
                <p className="text-sm text-gray-600">{entry.date}</p>
              </div>

              {/* InsightCard */}
              {expandedIndices.includes(idx) && (
                <div className="mt-2">
                  <InsightCard entry={entry} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="w-1/3 bg-gray-100 rounded-lg p-4 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-center">Visualization</h2>
          <div className="flex-1 bg-white rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Mood Tracker / Chart Area</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
