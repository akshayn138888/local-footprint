import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
const NavBar = props => {
  return (
    <div
      className="login-form1"
      style={{ backgroundColor: "rgba(235, 239, 249, 0.9)" }}
    >
      <div
        className="col-md-2 col-xs-6"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10%",
          marginBottom: "10%"
        }}
      >
        {/* <img
          src="/02_Logo/OwlLogo.png"
          style={{ paddingRight: 15, height: 30 }}
          alt="LOGO"
        /> */}
        <h5
          className="header__logo__title"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span style={{ color: "#3794D7" }}>Local</span>{" "}
          <span className="footer__black">Footprint</span>
        </h5>
      </div>
      <NavLink to="/DashBoardScreen" className="btd btd-3">
        Home
      </NavLink>
      <NavLink to="/LiveMapScreen" className="btd btd-3">
        Live Staff Map
      </NavLink>
      <NavLink to="IncidentScreen" className="btd btd-3">
        Report Map
      </NavLink>
    </div>
  );
};

export default NavBar;
