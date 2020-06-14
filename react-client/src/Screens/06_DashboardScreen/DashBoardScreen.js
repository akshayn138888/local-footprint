import React, { useState } from "react";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar.js";
import Weather from "../../components/Weather/Weather";
const Dashboard = props => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div
        className="sect sect--padding-bottom"
        style={{ position: "absolute", left: "35%", paddingTop: "0" }}
      >
        <div>
          <div
            className="row row--center row--margin"
            style={{ display: "flex" }}
          >
            <div className="0000000">
              <div className="col-md-4 col-sm-4 price-box price-box--purple">
                <div className="price-box__wrap">
                  <div
                    className="price-box__img"
                    style={{
                      backgroundImage: `url("./01_DashBoard/OnDutyStaff.png")`
                    }}
                  ></div>
                  <h1 className="price-box__title">On Duty Staff</h1>

                  <h2 className="price-box__discount">
                    <span className="price-box__dollar"></span>49
                  </h2>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 price-box price-box--purple">
                <div className="price-box__wrap">
                  <div>
                    <Weather />
                  </div>

                  <h2 className="price-box__discount"></h2>
                </div>
              </div>
            </div>
            <div className="0000000">
              <div className="col-md-4 col-sm-4 price-box price-box--purple">
                <div className="price-box__wrap">
                  <div
                    className="price-box__img"
                    style={{
                      backgroundImage: `url("./01_DashBoard/Incidents.png")`
                    }}
                  ></div>
                  <h1 className="price-box__title">Incidents Today</h1>

                  <h2 className="price-box__discount">
                    <span className="price-box__dollar"></span>21 Km
                  </h2>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 price-box price-box--purple">
                <div className="price-box__wrap">
                  <div className="price-box__img"></div>
                  <h1 className="price-box__title">List of Incident</h1>

                  <h2 className="price-box__discount">
                    <span className="price-box__dollar"></span>11
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
