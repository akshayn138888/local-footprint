import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { BsMap } from "react-icons/bs";

function DashBoardLP() {
  return (
    <div className={"LP"}>
      <div className={"centerVH"}>
        <a href="/" style={{ textDecoration: "none" }}>
          <h5
            className="header__logo__title"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <img
              className="footer__img"
              src="/02_Logo/OwlLogo.png"
              style={{ width: "1em", height: "1.3em", marginRight: "0.1em" }}
            />
            <span style={{ color: "#3794D7" }}>Local</span>{" "}
            <span className="footer__black" style={{ color: "white" }}>
              Footprint
            </span>
          </h5>
        </a>
      </div>
      <div className={"centerVH_FDC"}>
        <img
          className={"LP_photo"}
          src="https://www.photochaps.com/wp-content/uploads/2015/11/LI_13.jpg"
        />
        <h4>Ben Foster</h4>
        <p className="m_none" style={{ color: "#A0A0A0" }}>
          Guarda World
        </p>
      </div>
      <NavLink
        to="/DashBoardScreen"
        activeClassName={"active_icon_white"}
        className={"centerVH_FDC LP_button"}
      >
        <AiOutlineHome size={"3em"} />
        <span style={{ color: "white" }}>Overview</span>
      </NavLink>

      <NavLink
        to="/LiveMapScreen"
        activeClassName={"active_icon_white"}
        className={"centerVH_FDC LP_button"}
      >
        <FaUserFriends size={"3em"} />
        <span style={{ color: "white" }}>Live Staff Map</span>
      </NavLink>
      <NavLink
        to="IncidentScreen"
        activeClassName={"active_icon_white"}
        className={"centerVH_FDC LP_button"}
      >
        <BsMap size={"3em"} />
        <span style={{ color: "white" }}>Report Map</span>
      </NavLink>
    </div>
  );
}
export default DashBoardLP;
