// src/components/IncidentDetail.jsx
export default function IncidentDetail({ incident }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return "#10b981";
      case "in-progress":
        return "#06b6d4";
      case "critical":
        return "#ef4444";
      default:
        return "#f59e0b";
    }
  };

  const styles = {
    container: {
      background: "linear-gradient(135deg, #1e293b 0%, rgba(30, 41, 59, 0.8) 100%)",
      border: "1px solid #475569",
      borderRadius: "0.75rem",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      color: "#cbd5e1",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      color: "#f1f5f9",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      paddingBottom: "1.5rem",
      borderBottom: "1px solid #334155",
    },
    statusBadge: {
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontWeight: "600",
      fontSize: "0.875rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      border: "1px solid",
    },
    section: {
      marginBottom: "2rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#cbd5e1",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    timelineItem: {
      display: "flex",
      gap: "1.5rem",
      marginBottom: "1.5rem",
      paddingLeft: "1.5rem",
      borderLeft: "2px solid #06b6d4",
    },
    timelineTime: {
      fontSize: "0.875rem",
      color: "#06b6d4",
      fontWeight: "600",
      minWidth: "150px",
    },
    timelineEvent: {
      color: "#cbd5e1",
      lineHeight: "1.6",
    },
  };

  if (!incident) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <p style={{ fontSize: "1.1rem" }}>👈 Select an incident from the alert feed to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{incident.title}</h2>
        <span
          style={{
            ...styles.statusBadge,
            background: `rgba(${
              incident.status?.toLowerCase() === "resolved"
                ? "16, 185, 129"
                : incident.status?.toLowerCase() === "in-progress"
                ? "6, 182, 212"
                : "239, 68, 68"
            }, 0.1)`,
            color: getStatusColor(incident.status),
            borderColor: getStatusColor(incident.status),
          }}
        >
          {incident.status}
        </span>
      </div>

      {incident.description && (
        <div style={styles.section}>
          <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>{incident.description}</p>
        </div>
      )}

      {incident.timeline && incident.timeline.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📅 Timeline</h3>
          <div>
            {incident.timeline.map((t, i) => (
              <div key={i} style={styles.timelineItem}>
                <div style={styles.timelineTime}>{t.timestamp}</div>
                <div style={styles.timelineEvent}>{t.event}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {incident.affected_services && incident.affected_services.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>⚙️ Affected Services</h3>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {incident.affected_services.map((service, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  color: "#06b6d4",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  border: "1px solid #06b6d4",
                }}
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}