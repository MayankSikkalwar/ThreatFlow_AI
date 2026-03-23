// src/components/AlertFeed.jsx
export default function AlertFeed({ alerts, onSelect }) {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "#ef4444";
      case "high":
        return "#f59e0b";
      case "medium":
        return "#06b6d4";
      case "low":
        return "#10b981";
      default:
        return "#cbd5e1";
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "rgba(239, 68, 68, 0.1)";
      case "high":
        return "rgba(245, 158, 11, 0.1)";
      case "medium":
        return "rgba(6, 182, 212, 0.1)";
      case "low":
        return "rgba(16, 185, 129, 0.1)";
      default:
        return "rgba(203, 213, 225, 0.1)";
    }
  };

  const styles = {
    container: {
      background: "linear-gradient(135deg, #1e293b 0%, rgba(30, 41, 59, 0.8) 100%)",
      border: "1px solid #475569",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
      flex: 1,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
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
    list: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      overflowY: "auto",
      maxHeight: "400px",
      paddingRight: "0.5rem",
    },
    alertItem: {
      background: "rgba(15, 23, 42, 0.5)",
      border: "1px solid #334155",
      borderRadius: "0.5rem",
      padding: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderLeft: "4px solid #475569",
    },
    alertTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    alertName: {
      fontWeight: "600",
      fontSize: "1rem",
      color: "#f1f5f9",
    },
    alertBadge: {
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      border: "1px solid",
    },
    emptyState: {
      textAlign: "center",
      padding: "3rem 1rem",
      color: "#cbd5e1",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🚨 Alert Feed</h3>
      {alerts.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No alerts at this time</p>
        </div>
      ) : (
        <div style={styles.list}>
          {alerts.map((a) => (
            <div
              key={a._id}
              style={{
                ...styles.alertItem,
                borderLeftColor: getSeverityColor(a.severity),
              }}
              onClick={() => onSelect(a)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#06b6d4";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.2)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#334155";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={styles.alertTitle}>
                <span style={styles.alertName}>{a.rule_name}</span>
                <span
                  style={{
                    ...styles.alertBadge,
                    background: getSeverityBg(a.severity),
                    color: getSeverityColor(a.severity),
                    borderColor: getSeverityColor(a.severity),
                  }}
                >
                  {a.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}