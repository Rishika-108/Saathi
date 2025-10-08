// pages/Journaling/Journal.jsx (MODIFIED)
import React, { useState } from "react";
import JournalBook from "../../components/JournalingComponents/JournalBook";
import Greeting from "../../components/JournalingComponents/Greeting";
import InsightCard from "../../components/dashboardComponents/InsightCard";
import { useAppContext } from "../../context/AppContext"; // ✨ New import

const Journal = () => {
  const [showInsight, setShowInsight] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  // ✨ Use context for user and global save action
  const { currentUser, addJournalEntry } = useAppContext(); 

  // This function will be passed to JournalBook
  const handleSave = (entry) => {
    // 🚨 VULNERABILITY FIX: Add a unique ID for stability (Crucial for React keys)
    const entryWithId = { ...entry, id: Date.now().toString() }; 

    // 🚨 VULNERABILITY FIX: Persist the entry to global state
    addJournalEntry(entryWithId); 
    
    setCurrentEntry(entryWithId); 
    setShowInsight(true);
  };

  const closeInsight = () => {
    setShowInsight(false);
    setCurrentEntry(null);
  };
  
  // Get a safe username from context
  const userName = currentUser ? currentUser.name : "Journalist";

  return (
    <div>
      {/* 🚨 VULNERABILITY FIX: Use dynamic user name */}
      <Greeting userName={userName} /> 
      <JournalBook onSave={handleSave} />

      {/* Overlay InsightCard */}
      {showInsight && currentEntry && (
        // The modal InsightCard component (from previous analysis) should be renamed to InsightModal
        <InsightCard entry={currentEntry} onClose={closeInsight} /> 
      )}
    </div>
  );
};

export default Journal;