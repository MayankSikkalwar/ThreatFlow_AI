// src/components/Header.jsx
import { useEffect, useState } from "react";

export default function Header({ threatLevel, systemStatus }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getThreatColor = (level) => {
    switch (level) {
      case "critical":
        return "#ef4444";
      case "high":
        return "#f59e0b";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#06b6d4";
    }
  };

  const getThreatBg = (level) => {
    switch (level) {
      case "critical":
        return "rgba(239, 68, 68, 0.1)";
      case "high":
        return "rgba(245, 158, 11, 0.1)";
      case "medium":
        return "rgba(245, 158, 11, 0.1)";
      case "low":
        return "rgba(16, 185, 129, 0.1)";
      default:
        return "rgba(6, 182, 212, 0.1)";
    }
  };

  const styles = {
    header: {
      background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
      borderBottom: "2px solid #06b6d4",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 20px rgba(6, 182, 212, 0.2)",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    logoIcon: {
      fontSize: "2rem",
      animation: "pulse 2s infinite",
    },
    logoText: {
      fontSize: "1.5rem",
      fontWeight: "700",
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    threatIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      background: getThreatBg(threatLevel),
      border: `2px solid ${getThreatColor(threatLevel)}`,
    },
    threatLabel: {
      color: getThreatColor(threatLevel),
      fontWeight: "600",
      fontSize: "0.9rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    statusIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      background: "rgba(16, 185, 129, 0.1)",
      border: "2px solid #10b981",
    },
    statusDot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "#10b981",
      animation: "pulse 1.5s infinite",
    },
    statusText: {
      color: "#10b981",
      fontWeight: "600",
      fontSize: "0.9rem",
      textTransform: "uppercase",
    },
    time: {
      fontSize: "1.1rem",
      color: "#06b6d4",
      fontWeight: "600",
      fontFamily: "'Courier New', monospace",
      minWidth: "150px",
      textAlign: "right",
    },
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      <div style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🛡️</div>
          <div style={styles.logoText}>SOC Defense Command Center</div>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.threatIndicator}>
            <span style={{ fontSize: "1.2rem" }}>⚠️</span>
            <span style={styles.threatLabel}>Threat Level: {threatLevel.toUpperCase()}</span>
          </div>

          <div style={styles.statusIndicator}>
            <div style={styles.statusDot}></div>
            <span style={styles.statusText}>All Systems Online</span>
          </div>

          <div style={styles.time}>{time.toLocaleTimeString()}</div>
        </div>
      </div>
    </>
  );
}
