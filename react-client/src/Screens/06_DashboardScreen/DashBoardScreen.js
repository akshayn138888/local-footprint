import React, { useState } from "react";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar.js";
const Dashboard = props => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  return (
    <div>
      <div className="sect sect--padding-bottom">
        <div className="container">
          <div style={{ display: "flex" }}>
            <div>
              <NavBar />
            </div>

            <div
              className="row row--center row--margin"
              style={{ display: "flex" }}
            >
              <div className="0000000">
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div className="price-box__wrap">
                    <div className="price-box__img"></div>
                    <h1 className="price-box__title">On Duty Staff</h1>

                    <h2 className="price-box__discount">
                      <span className="price-box__dollar"></span>49
                    </h2>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div className="price-box__wrap">
                    <div className="price-box__img"></div>
                    <h1 className="price-box__title">Incidents Today</h1>

                    <h2 className="price-box__discount">
                      <span className="price-box__dollar"></span>11
                    </h2>
                  </div>
                </div>
              </div>
              <div className="0000000">
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div className="price-box__wrap">
                    <div className="price-box__img"></div>
                    <h1 className="price-box__title">Distance</h1>

                    <h2 className="price-box__discount">
                      <span className="price-box__dollar"></span>21 Km
                    </h2>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div className="price-box__wrap">
                    <div className="price-box__img"></div>
                    <h1 className="price-box__title">Type of Incidents</h1>

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
    </div>
  );
};

export default Dashboard;
