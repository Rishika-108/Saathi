import React from "react";

const Greeting = ({ userName = "User" }) => {
  // Get current hour
  const hour = new Date().getHours();
  let greetingText = "";

  if (hour < 12) greetingText = "Good Morning";
  else if (hour < 18) greetingText = "Good Afternoon";
  else greetingText = "Good Evening";

  return (
    <div style={styles.container}>
      <h1 style={styles.greeting}>{`${greetingText}, ${userName}!`}</h1>
      <p style={styles.subtitle}>Take a moment to reflect on your day.</p>
    </div>
  );
};

// Simple inline styles for now; can replace with CSS module
const styles = {
  container: {
    margin: "2rem 0",
    textAlign: "center",
  },
  greeting: {
    fontSize: "3rem", // big greeting
    fontWeight: "bold",
    color: "#3B82F6", // nice blue accent
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#374151", // neutral gray
    marginTop: "0.5rem",
  },
};

export default Greeting;
