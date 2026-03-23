// src/components/RealTimeEvents.jsx
export default function RealTimeEvents() {
  const events = [
    {
      time: "14:32:05",
      type: "Threat Detected",
      source: "192.168.1.45",
      severity: "high",
      message: "Suspicious login attempt detected",
    },
    {
      time: "14:28:12",
      type: "System Update",
      source: "Endpoint-Server-03",
      severity: "low",
      message: "Security patches applied successfully",
    },
    {
      time: "14:15:03",
      type: "Alert",
      source: "192.168.2.78",
      severity: "medium",
      message: "Unusual network traffic detected",
    },
    {
      time: "14:08:45",
      type: "Blocked",
      source: "External IP",
      severity: "high",
      message: "Malicious file upload attempt blocked",
    },
    {
      time: "13:52:22",
      type: "Info",
      source: "System",
      severity: "low",
      message: "Database backup completed",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444" };
      case "high":
        return { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b" };
      case "medium":
        return { bg: "rgba(245, 158, 11, 0.1)", text: "#f59e0b" };
      case "low":
        return { bg: "rgba(16, 185, 129, 0.1)", text: "#10b981" };
      default:
        return { bg: "rgba(6, 182, 212, 0.1)", text: "#06b6d4" };
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "Threat Detected":
        return "🚨";
      case "System Update":
        return "✅";
      case "Alert":
        return "⚠️";
      case "Blocked":
        return "🛑";
      default:
        return "ℹ️";
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
    eventsList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      maxHeight: "400px",
      overflowY: "auto",
      paddingRight: "0.5rem",
    },
    eventItem: {
      background: "rgba(15, 23, 42, 0.5)",
      border: "1px solid #334155",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      display: "flex",
      gap: "0.75rem",
      alignItems: "flex-start",
      transition: "all 0.3s ease",
    },
    eventIcon: {
      fontSize: "1.25rem",
      minWidth: "30px",
    },
    eventContent: {
      flex: 1,
      minWidth: 0,
    },
    eventHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.25rem",
    },
    eventType: {
      fontWeight: "600",
      color: "#f1f5f9",
      fontSize: "0.9rem",
    },
    eventTime: {
      fontSize: "0.75rem",
      color: "#94a3b8",
      fontFamily: "'Courier New', monospace",
    },
    eventSource: {
      fontSize: "0.8rem",
      color: "#cbd5e1",
      marginBottom: "0.25rem",
    },
    eventMessage: {
      fontSize: "0.75rem",
      color: "#cbd5e1",
    },
    severityBadge: {
      padding: "0.2rem 0.6rem",
      borderRadius: "4px",
      fontSize: "0.65rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📊 Real-Time Events Log</h3>
      <div style={styles.eventsList}>
        {events.map((event, idx) => {
          const severityColor = getSeverityColor(event.severity);
          const icon = getEventIcon(event.type);

          return (
            <div
              key={idx}
              style={styles.eventItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#06b6d4";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(6, 182, 212, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#334155";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.5)";
              }}
            >
              <div style={styles.eventIcon}>{icon}</div>
              <div style={styles.eventContent}>
                <div style={styles.eventHeader}>
                  <span style={styles.eventType}>{event.type}</span>
                  <span style={styles.eventTime}>{event.time}</span>
                </div>
                <div style={styles.eventSource}>
                  <strong>Source:</strong> {event.source}
                </div>
                <div style={styles.eventMessage}>{event.message}</div>
              </div>
              <span
                style={{
                  ...styles.severityBadge,
                  background: severityColor.bg,
                  color: severityColor.text,
                }}
              >
                {event.severity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
