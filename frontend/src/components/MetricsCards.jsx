// src/components/MetricsCards.jsx
export default function MetricsCards({ metrics }) {
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
    metricsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "1rem",
    },
    metricCard: {
      background: "rgba(15, 23, 42, 0.5)",
      border: "1px solid #334155",
      borderRadius: "0.5rem",
      padding: "1rem",
      textAlign: "center",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    metricLabel: {
      fontSize: "0.875rem",
      color: "#cbd5e1",
      textTransform: "capitalize",
      marginBottom: "0.5rem",
      fontWeight: "500",
      letterSpacing: "0.05em",
    },
    metricValue: {
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#06b6d4",
      textShadow: "0 0 10px rgba(6, 182, 212, 0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📊 Metrics</h3>
      <div style={styles.metricsGrid}>
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} style={styles.metricCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#06b6d4";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.2)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#334155";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={styles.metricLabel}>{key}</div>
            <div style={styles.metricValue}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}