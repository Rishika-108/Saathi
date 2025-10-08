import React from "react";

const InsightCard = ({ entry, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>{entry.title}</h2>
        <p style={styles.date}>{entry.date}</p>

        <div style={styles.section}>
          <h3>Emotions:</h3>
          <ul>
            {entry.emotions.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Cognitive Biases:</h3>
          <ul>
            {entry.biases.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Triggers:</h3>
          <ul>
            {entry.triggers.map((t, idx) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>
        </div>

        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  date: {
    fontSize: "0.9rem",
    color: "#6B7280",
    marginBottom: "1rem",
  },
  section: {
    marginBottom: "1rem",
  },
  closeButton: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#EF4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default InsightCard;
