// src/components/Copilot.jsx
import { useState } from "react";
import { sendCopilotQuery } from "../services/api";

export default function Copilot({ incidentId }) {
  const [q, setQ] = useState("");
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const ask = async () => {
    if (!q.trim()) return;
    
    setLoading(true);
    try {
      const r = await sendCopilotQuery({ incidentId, query: q });
      const answer = r.data.answer;
      setRes(answer);
      setHistory([...history, { question: q, answer }]);
      setQ("");
    } catch (error) {
      setRes("Error: Unable to process your query. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
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
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    inputGroup: {
      display: "flex",
      gap: "0.75rem",
      marginBottom: "1.5rem",
      flexWrap: "wrap",
    },
    input: {
      flex: 1,
      minWidth: "200px",
      background: "#0f172a",
      border: "1px solid #475569",
      color: "#f1f5f9",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.95rem",
      fontFamily: "inherit",
      transition: "all 0.3s ease",
    },
    button: {
      padding: "0.75rem 1.5rem",
      background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
      color: "#fff",
      border: "none",
      borderRadius: "0.5rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(6, 182, 212, 0.3)",
      minWidth: "120px",
    },
    chatHistory: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginBottom: "1.5rem",
      maxHeight: "300px",
      overflowY: "auto",
      paddingRight: "0.5rem",
    },
    chatBubble: {
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "0.5rem",
      lineHeight: "1.6",
    },
    userBubble: {
      background: "rgba(6, 182, 212, 0.15)",
      border: "1px solid #06b6d4",
      color: "#cbd5e1",
      marginLeft: "2rem",
      textAlign: "right",
    },
    aiBubble: {
      background: "rgba(139, 92, 246, 0.15)",
      border: "1px solid #8b5cf6",
      color: "#cbd5e1",
      marginRight: "2rem",
    },
    responseBox: {
      background: "rgba(15, 23, 42, 0.5)",
      border: "1px solid #334155",
      borderRadius: "0.5rem",
      padding: "1rem",
      minHeight: "60px",
      color: "#cbd5e1",
      lineHeight: "1.6",
      fontStyle: "italic",
    },
    disabledState: {
      opacity: 0.6,
      textAlign: "center",
      paddingTop: "2rem",
      color: "#cbd5e1",
    },
  };

  if (!incidentId) {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>🤖 AI Copilot</h3>
        <div style={styles.disabledState}>
          <p>👈 Select an incident to enable AI assistance</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🤖 AI Copilot</h3>
      
      {history.length > 0 && (
        <div style={styles.chatHistory}>
          {history.map((item, idx) => (
            <div key={idx}>
              <div style={{ ...styles.chatBubble, ...styles.userBubble }}>
                <strong>Q:</strong> {item.question}
              </div>
              <div style={{ ...styles.chatBubble, ...styles.aiBubble }}>
                <strong>A:</strong> {item.answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {res && !history.find(h => h.answer === res) && (
        <div style={{ ...styles.responseBox, marginBottom: "1.5rem" }}>
          <strong>Response:</strong> {res}
        </div>
      )}

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about this incident..."
          style={styles.input}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#06b6d4";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#475569";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          onClick={ask}
          style={styles.button}
          disabled={loading || !q.trim()}
          onMouseEnter={(e) => {
            if (!loading && q.trim()) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(6, 182, 212, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(6, 182, 212, 0.3)";
          }}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
}