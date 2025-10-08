import React, { useState } from "react";
import InsightCard from "./InsightCard"; // Pop-up after save
import mockData from "../../assets/assets/mockAnalysis.json"; // sample data

const JournalBook = () => {
  // States for journal input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showInsight, setShowInsight] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  // Handle Save
  const handleSave = () => {
    if (!title || !description) {
      alert("Please enter both title and description.");
      return;
    }

    // Mock AI analysis: pick random entry from mock data
    const randomAnalysis = mockData.entries[
      Math.floor(Math.random() * mockData.entries.length)
    ].analysis;

    setAnalysis({
      title,
      date: new Date().toLocaleDateString(),
      ...randomAnalysis,
    });

    setShowInsight(true);

    // Clear input fields
    setTitle("");
    setDescription("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.book}>
        <h2 style={styles.heading}>Your Journal</h2>
        <input
          style={styles.input}
          type="text"
          placeholder="Entry Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Write your thoughts here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={styles.saveButton} onClick={handleSave}>
          Save Entry
        </button>
      </div>

      {/* Pop-up Insight */}
      {showInsight && (
        <InsightCard
          entry={analysis}
          onClose={() => setShowInsight(false)}
        />
      )}
    </div>
  );
};

// Inline styles for the journal book
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  book: {
    width: "500px",
    padding: "2rem",
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "Georgia, serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #D1D5DB",
    outline: "none",
  },
  textarea: {
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #D1D5DB",
    outline: "none",
    minHeight: "150px",
    resize: "vertical",
    fontFamily: "Georgia, serif",
  },
  saveButton: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#3B82F6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default JournalBook;
