import React from "react";
import InsightCard from "./InsightCard";

function DashboardLeftColumn({ journalEntries }) {
  return (
    <div className="space-y-4">
      {journalEntries && journalEntries.length > 0 ? (
        journalEntries.map((entry, idx) => (
          <InsightCard key={idx} entry={entry} />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10">No journal entries yet.</p>
      )}
    </div>
  );
}

export default DashboardLeftColumn;
