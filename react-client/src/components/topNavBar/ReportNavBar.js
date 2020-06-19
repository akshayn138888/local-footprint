import React from "react";
import { NavLink } from "react-router-dom";
import "./topNavBar.scss";
const ReportNavBar = props => {
  return (
    <div>
      <div
        className="top-navbar-report"
        style={{ backgroundColor: "rgba(235, 239, 249, 0.9)" }}
      >
        <NavLink to="/ReportStats" className="btd btd-3">
          Report Stats
        </NavLink>{" "}
        |
        <NavLink to="IncidentScreen" className="btd btd-3">
          Report Map
        </NavLink>
      </div>
    </div>
  );
};

export default ReportNavBar;
