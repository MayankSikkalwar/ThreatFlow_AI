// src/App.jsx
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [systemStatus, setSystemStatus] = useState("secure");
  const [threatLevel, setThreatLevel] = useState("low");

  useEffect(() => {
    // Simulate real-time threat level updates
    const interval = setInterval(() => {
      const levels = ["low", "medium", "high", "critical"];
      setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const styles = {
    app: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1a1f36 100%)",
    },
  };

  return (
    <div style={styles.app}>
      <Dashboard threatLevel={threatLevel} systemStatus={systemStatus} />
    </div>
  );
}