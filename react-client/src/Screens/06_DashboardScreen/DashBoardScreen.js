import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar.js";
import Weather from "../../components/Weather/Weather";
const Dashboard = props => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [report, setReport] = useState(null);
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch("https://location-app-5d3d8.firebaseio.com/images.json", {
      method: "GET"
    })
      .then(e => e.json())
      .then(data => {
        console.log("request made reports");
        setReport(data);
      });

    fetch("https://location-app-5d3d8.firebaseio.com/locations.json", {
      method: "GET"
    })
      .then(e => e.json())
      .then(users => {
        //console.log(data);
        setUsers(users);
        console.log("request made for users");
      });
  }, []);

  if (users && report) {
    ////////////////Live Users Data ?/////////////////////
    let set1 = new Set();
    for (let [key, value] of Object.entries(users)) {
      for (let [key1, value1] of Object.entries(value)) {
        if (value1.timestamp) {
          if ((new Date() - Date.parse(value1.timestamp)) / (1000 * 60) < 15) {
            set1.add(value);
          }
        }
      }
    }
    ////////// Live report Data ????///////////////////////
    let hashMap = {};
    let count = 0;
    let incidentArray = [];
    for (let [key, value] of Object.entries(report)) {
      // console.log(value);

      for (let [key1, value1] of Object.entries(value)) {
        incidentArray.push(value1);
        if (value1.incident === "Assault") {
          hashMap["Assault"] = +1;
          count++;
        } else if (value1.incident === "Break and Enter") {
          hashMap["Break And Enter"] = +1;
          count++;
        } else if (value1.incident === "General Theft") {
          hashMap["General Theft"] = +1;
          count++;
        } else if (value1.incident === "Property Damage") {
          hashMap["Property Damage"] = +1;
          count++;
        } else if (value1.incident === "Public Intoxication") {
          hashMap["Public Intoxication"] = +1;
          count++;
        } else if (value1.incident === "Vehicle Collision") {
          hashMap["Vehicle Collision"] = +1;
          count++;
        } else if (value1.incident === "Vehicle Theft") {
          hashMap["Vehicle Theft"] = +1;
          count++;
        }
      }
    }
    return (
      <div>
        <div>
          <NavBar />
        </div>

        <div
          className="sect sect--padding-bottom"
          style={{ position: "absolute", left: "300px", paddingTop: "0" }}
        >
          <div>
            <div
              className="row row--center row--margin"
              style={{ display: "flex" }}
            >
              <div className="0000000">
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div
                    className="price-box__wrap1"
                    style={{
                      marginBottom: "10px"
                    }}
                  >
                    <div
                      className="price-box__img"
                      style={{
                        backgroundImage: `url("./01_DashBoard/OnDutyStaff.png")`
                      }}
                    ></div>
                    <h1 className="price-box__title">On Duty Staff</h1>

                    <h2 className="price-box__discount">
                      <span className="price-box__dollar"></span>
                      {set1.size}
                    </h2>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div className="price-box__wrap1">
                    <div>
                      <Weather />
                    </div>

                    <h2 className="price-box__discount"></h2>
                  </div>
                </div>
              </div>
              <div className="0000000">
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div
                    className="price-box__wrap1"
                    style={{
                      marginBottom: "10px"
                    }}
                  >
                    <div
                      className="price-box__img"
                      style={{
                        backgroundImage: `url("./01_DashBoard/Incidents.png")`
                      }}
                    ></div>
                    <h1 className="price-box__title">Incidents Total</h1>

                    <h2 className="price-box__discount">
                      <span className="price-box__dollar"></span>
                      {count}
                    </h2>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div className="price-box__wrap1">
                    <h1 className="price-box__title">List of Incidents</h1>

                    <ul className="price-box__list1" style={{ content: "." }}>
                      <br />
                      <li className="price-box__list1-el">
                        <strong>{hashMap["Assault"]}</strong> - Assault
                      </li>
                      <li className="price-box__list1-el">
                        {" "}
                        <strong>{hashMap["Break And Enter"]}</strong> - Break
                        And Enter
                      </li>
                      <li className="price-box__list1-el">
                        {" "}
                        <strong>{hashMap["General Theft"]}</strong> - General
                        Theft
                      </li>
                      <li className="price-box__list1-el">
                        {" "}
                        <strong>{hashMap["Property Damage"]}</strong> - Property
                        Damage{" "}
                      </li>
                      <li className="price-box__list1-el">
                        <strong>{hashMap["Public Intoxication"]}</strong> -
                        Public Intoxication{" "}
                      </li>
                      <li className="price-box__list1-el">
                        {" "}
                        <strong>{hashMap["Vehicle Collision"]}</strong> -
                        Vehicle Collision
                      </li>
                      <li className="price-box__list1-el">
                        {" "}
                        <strong>{hashMap["Vehicle Theft"]}</strong> - Vehicle
                        Theft{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="verticalLine"></div>
              <div className="000000">
                <div className="col-md-4 col-sm-4 price-box price-box--purple">
                  <div className="price-box__wrap2">
                    <h1 className="price-box__title">Latest Incident</h1>
                    <div
                      className="price-box__img1"
                      style={{
                        backgroundImage: `url(${
                          incidentArray[incidentArray.length - 1].url
                        })`
                      }}
                    ></div>
                    <h5 style={{ textDecoration: "underline" }}>
                      {incidentArray[incidentArray.length - 1].incident}{" "}
                    </h5>
                    <strong>
                      Reported by:{" "}
                      {
                        incidentArray[incidentArray.length - 1].userEmail.split(
                          "@"
                        )[0]
                      }
                    </strong>
                    <p>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric"
                      }).format(
                        Date.parse(
                          incidentArray[incidentArray.length - 1].timestamp
                        )
                      )}
                    </p>
                    <div>
                      <p style={{ textTransform: "capitalize" }}>
                        {incidentArray[
                          incidentArray.length - 1
                        ].description.slice(0, 200)}
                        ...
                      </p>
                    </div>
                    <h2 className="price-box__discount"></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
};

export default Dashboard;
