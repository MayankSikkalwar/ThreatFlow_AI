// src/components/SystemsHealth.jsx
export default function SystemsHealth() {
  const systems = [
    { name: "Network Defense", status: "online", uptime: "99.9%", threat: 0 },
    { name: "Endpoint Protection", status: "online", uptime: "99.8%", threat: 0 },
    { name: "Threat Intelligence", status: "online", uptime: "99.9%", threat: 2 },
    { name: "SIEM Monitoring", status: "online", uptime: "100%", threat: 0 },
    { name: "Malware Analysis", status: "online", uptime: "98.5%", threat: 1 },
    { name: "Log Aggregation", status: "online", uptime: "99.7%", threat: 0 },
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
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
    },
    systemCard: {
      background: "rgba(15, 23, 42, 0.5)",
      border: "1px solid #334155",
      borderRadius: "0.5rem",
      padding: "1rem",
      transition: "all 0.3s ease",
    },
    systemName: {
      fontWeight: "600",
      color: "#f1f5f9",
      marginBottom: "0.75rem",
      fontSize: "0.95rem",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.4rem 0.8rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "600",
      background: "rgba(16, 185, 129, 0.1)",
      color: "#10b981",
      border: "1px solid #10b981",
      marginBottom: "0.5rem",
    },
    systemDetails: {
      fontSize: "0.85rem",
      color: "#cbd5e1",
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "0.75rem",
      borderTop: "1px solid #475569",
    },
    detail: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    },
    detailLabel: {
      fontSize: "0.75rem",
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    detailValue: {
      fontWeight: "600",
      color: "#06b6d4",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🔒 Systems Health</h3>
      <div style={styles.grid}>
        {systems.map((system, idx) => (
          <div
            key={idx}
            style={styles.systemCard}
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
            <div style={styles.systemName}>{system.name}</div>
            <div style={styles.statusBadge}>● {system.status}</div>
            <div style={styles.systemDetails}>
              <div style={styles.detail}>
                <span style={styles.detailLabel}>Uptime</span>
                <span style={styles.detailValue}>{system.uptime}</span>
              </div>
              <div style={styles.detail}>
                <span style={styles.detailLabel}>Threats</span>
                <span style={styles.detailValue}>{system.threat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
