import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
const NavBar = props => {
  return (
    <div className="login-form">
      <div
        className="col-md-2 col-xs-6"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10%",
          marginBottom: "10%"
        }}
      >
        <img
          src="/02_Logo/OwlLogo.png"
          style={{ paddingRight: 15, height: 30 }}
        />
        <h5
          className="header__logo__title"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span style={{ color: "#3794D7" }}>Local</span>{" "}
          <span className="footer__black">Footprint</span>
        </h5>
      </div>
      <NavLink to="/DashBoardScreen" class="btd btd-3">
        Home
      </NavLink>
      <NavLink to="/LiveMapScreen" class="btd btd-3">
        Live Staff Map
      </NavLink>
      <NavLink to="IncidentScreen" class="btd btd-3">
        Report Map
      </NavLink>
      <NavLink to="" class="btd btd-3">
        Report Statistics
      </NavLink>
      <NavLink to="" class="btd btd-3">
        Add A Worker
      </NavLink>
    </div>
  );
};

export default NavBar;
