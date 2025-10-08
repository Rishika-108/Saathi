// components/dashboardComponents/DashboardLeftColumn.jsx (MODIFIED)
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import InsightCard from "./InsightCard";

// Note: This component is for the collapsible/summary view of the cards
function DashboardLeftColumn() {
  const { journalEntries } = useAppContext();
  const [expandedId, setExpandedId] = useState(null); // Use ID for stability

  const toggleCard = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };
  
  return (
    <div className="space-y-4">
      {journalEntries.length > 0 ? (
        journalEntries.map((entry) => (
          // 🚨 VULNERABILITY FIX: Use entry.id as key
          <InsightCard 
            key={entry.id} 
            entry={entry} 
            isExpanded={expandedId === entry.id}
            onToggle={() => toggleCard(entry.id)}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10">No journal entries yet.</p>
      )}
    </div>
  );
}

export default DashboardLeftColumn;