// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getAlerts = () => API.get("/alerts");
export const getIncidents = () => API.get("/incidents");
export const getMetrics = () => API.get("/metrics");

export const sendCopilotQuery = (data) =>
  API.post("/copilot/query", data);