// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AlertFeed from "../components/AlertFeed";
import IncidentDetail from "../components/IncidentDetail";
import MetricsCards from "../components/MetricsCards";
import Copilot from "../components/Copilot";
import SystemsHealth from "../components/SystemsHealth";
import RealTimeEvents from "../components/RealTimeEvents";
import ThreatIntelligence from "../components/ThreatIntelligence";
import { getAlerts, getIncidents, getMetrics } from "../services/api";
import socket from "../services/websocket";

export default function Dashboard({ threatLevel, systemStatus }) {
  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    loadData();

    socket.on("alert:new", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const loadData = async () => {
    const a = await getAlerts();
    const i = await getIncidents();
    const m = await getMetrics();

    setAlerts(a.data);
    setIncidents(i.data);
    setMetrics(m.data);
  };

  const styles = {
    dashboard: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1a1f36 100%)",
    },
    content: {
      flex: 1,
      overflow: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto auto auto",
      gap: "2rem",
      padding: "2rem",
      maxWidth: "2000px",
      margin: "0 auto",
      width: "100%",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    twoColumn: {
      gridColumn: "span 2",
    },
  };

  return (
    <div style={styles.dashboard}>
      <Header threatLevel={threatLevel} systemStatus={systemStatus} />
      
      <div style={styles.content}>
        {/* Top Row - Systems Health (Full Width) */}
        <div style={{ ...styles.fullWidth }}>
          <SystemsHealth />
        </div>

        {/* Second Row - Real-Time Events (2/3) and Threat Intelligence (1/3) */}
        <div style={{ ...styles.twoColumn }}>
          <RealTimeEvents />
        </div>
        <div>
          <ThreatIntelligence />
        </div>

        {/* Third Row - Metrics, Alerts, Incident Details */}
        <div>
          <div style={styles.section}>
            <MetricsCards metrics={metrics} />
            <AlertFeed alerts={alerts} onSelect={setSelectedIncident} />
          </div>
        </div>

        <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <IncidentDetail incident={selectedIncident} />
          <Copilot incidentId={selectedIncident?._id} />
        </div>
      </div>
    </div>
  );
}