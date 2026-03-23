// src/components/ThreatIntelligence.jsx
export default function ThreatIntelligence() {
  const threatData = [
    { category: "Malware", count: 12, trend: "+3", color: "#ef4444" },
    { category: "Phishing", count: 45, trend: "+8", color: "#f59e0b" },
    { category: "DDoS Attempts", count: 234, trend: "-12", color: "#f59e0b" },
    { category: "Exploits", count: 5, trend: "0", color: "#06b6d4" },
    { category: "Data Exfiltration", count: 2, trend: "-1", color: "#10b981" },
  ];

  const styles = {
    container: {
      background: "linear-gradient(135deg, #1e293b 0%, rgba(30, 41, 59, 0.8) 100%)",
      border: "1px solid #475569",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    threatsList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    threatItem: {
      background: "rgba(15, 23, 42, 0.5)",
      border: "1px solid #334155",
      borderRadius: "0.5rem",
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.3s ease",
    },
    threatLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    categoryName: {
      fontWeight: "600",
      color: "#f1f5f9",
      fontSize: "0.95rem",
    },
    colorDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      opacity: 0.8,
    },
    threatStats: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    count: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#06b6d4",
    },
    trend: {
      padding: "0.4rem 0.8rem",
      borderRadius: "0.4rem",
      fontSize: "0.8rem",
      fontWeight: "600",
      minWidth: "60px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🎯 Threat Intelligence</h3>
      <div style={styles.threatsList}>
        {threatData.map((threat, idx) => {
          const isIncreasing = threat.trend.startsWith("+");
          const trendColor = isIncreasing ? "#ef4444" : "#10b981";
          const trendBg = isIncreasing
            ? "rgba(239, 68, 68, 0.1)"
            : "rgba(16, 185, 129, 0.1)";

          return (
            <div
              key={idx}
              style={styles.threatItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#06b6d4";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.2)";
                e.currentTarget.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#334155";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={styles.threatLabel}>
                <div
                  style={{
                    ...styles.colorDot,
                    background: threat.color,
                  }}
                ></div>
                <span style={styles.categoryName}>{threat.category}</span>
              </div>
              <div style={styles.threatStats}>
                <div style={styles.count}>{threat.count}</div>
                <div
                  style={{
                    ...styles.trend,
                    background: trendBg,
                    color: trendColor,
                  }}
                >
                  {threat.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
