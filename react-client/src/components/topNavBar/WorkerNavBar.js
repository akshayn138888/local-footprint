import React from "react";
import { NavLink } from "react-router-dom";
import "./topNavBar.scss";
const WorkerNavBar = () => {
  return (
    <div>
      <div
        className="top-navbar-worker"
        style={{ backgroundColor: "rgba(235, 239, 249, 0.9)" }}
      >
        <NavLink to="/LiveMapScreen" className="btd btd-3">
          Live Staff Map
        </NavLink>{" "}
        |
        <NavLink to="/LiveWorkerStats" className="btd btd-3">
          Live Staff Stats
        </NavLink>{" "}
        |
        <NavLink to="/WorkerTimeLapse" className="btd btd-3">
          Staff Time Lapse
        </NavLink>
      </div>
    </div>
  );
};
export default WorkerNavBar;
