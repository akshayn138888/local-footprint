import React from "react";
import "./Ghost.css";
import { NavLink } from "react-router-dom";
function GhostButton() {
  return (
    <div className="hero-buttons-1">
      <a class="ghost-button-1" href="/LiveMapScreen">
        Live Map
      </a>

      <a class="ghost-button-1" href="/IncidentScreen">
        Report Map
      </a>
      <a class="ghost-button-1" href="/ReportStats">
        Reports HeatMap
      </a>
      <a class="ghost-button-1" href="/WorkerTimeLapse">
        Time Lapse
      </a>
      <a class="ghost-button-1" href="/LiveWorkerStats">
        3D Stats
      </a>
    </div>
  );
}
export default GhostButton;
