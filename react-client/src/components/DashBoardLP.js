import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { BsMap } from "react-icons/bs";

function DashBoardLP() {
  return (
    <div className={"LP"}>
      <div className={"centerVH"}>
        <h5 className="header__logo__title">
          <span style={{ color: "#3794D7" }}>Local</span>{" "}
          <span className="footer__black" style={{ color: "white" }}>
            Footprint
          </span>
        </h5>
      </div>
      <div className={"centerVH_FDC"}>
        <img
          className={"LP_photo"}
          src="https://annemariesegal.files.wordpress.com/2017/06/img_0422-linkedin-size-smiling-man-in-suit.png?w=750&h=742"
        />
        <h4>John Smith</h4>
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
