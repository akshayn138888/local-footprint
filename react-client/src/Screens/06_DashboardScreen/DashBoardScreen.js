import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar.js";
import Weather from "../../components/Weather/Weather";
import Spinner from "../../components/spinner/Spinner";

import { BsMap, BsClock } from "react-icons/bs";
import { IoIosPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Line, Radar, HorizontalBar } from "react-chartjs-2";
import DashBoardLP from "../../components/DashBoardLP";

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
    let currentAddress = [];
    let set1 = new Set();
    for (let [key, value] of Object.entries(users)) {
      let allAddresses = [];
      for (let [key1, value1] of Object.entries(value)) {
        if (value1.timestamp) {
          if (
            (new Date() - Date.parse(value1.timestamp)) / (1000 * 60) <
            1000000
          ) {
            // if ((new Date() - Date.parse(value1.timestamp)) / (1000 * 60) < 15) {
            set1.add(value1.userEmail);
            allAddresses.push({
              latitude: `${value1.latitude}`,
              longitude: `${value1.longitude}`
            });
          }
        }
      }
      currentAddress.push(allAddresses[allAddresses.length - 1]);
    }
    let usersLoggedIn = Array.from(set1);

    ////////// Live report Data ????///////////////////////
    let hashMap = {};
    let count = 0;
    let incidentArray = [];
    for (let [key, value] of Object.entries(report)) {
      // console.log(value);

      for (let [key1, value1] of Object.entries(value)) {
        incidentArray.push({ userId: key, reportId: key1, ...value1 });
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
      <>
        <div style={{ height: "200vh", width: "100vw", background: "#202227" }}>
          {/* Left Pane */}
          <DashBoardLP />

          {/* Center Pane */}
          <div className="CP">
            <div
              style={{ display: "flex", flexDirection: "column", padding: 5 }}
            >
              <h4
                className={`m_none`}
                style={{
                  width: "100%",
                  color: "white",
                  marginBottom: "1em",
                  marginLeft: 5
                }}
              >
                Incident Statistics
              </h4>

              {/* Top Box */}
              <div className="Top_Box inner_box">
                <h5 className={"m_none inner_box_heading"}>
                  Incidents This Month
                </h5>
                <div className={"chart_height"}>
                  <Line
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: false
                      },
                      scales: {
                        xAxes: [
                          {
                            ticks: {
                              fontColor: "white"
                            }
                          }
                        ],
                        yAxes: [
                          {
                            ticks: {
                              fontColor: "white"
                            }
                          }
                        ]
                      }
                    }}
                    data={{
                      labels: [
                        "Jan",
                        "Feb.",
                        `Mar`,
                        "April",
                        "May",
                        "June",
                        "July"
                      ],
                      datasets: [
                        {
                          label: "Total Incidents This Month",
                          data: [12, 10, 6, 8, 9, 10, 18],
                          borderColor: "rgba(254, 111,94, 0.7)",
                          backgroundColor: "rgba(254, 111,94, 0.05)",
                          borderWidth: 2
                        }
                      ]
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}
              >
                {/* Left Bottom Box */}
                <div className="Left_Bottom_Box inner_box">
                  <h5 className={"m_none inner_box_heading"}>On Duty Staff</h5>
                  <div>
                    {usersLoggedIn.map(userEmail => (
                      <div className={"centerVH user_info_outer"}>
                        <IoIosPerson className={"person_logo"} />
                        <div className={"user_info_inner"}>
                          <p className={"user_email m_none"}>{userEmail}</p>
                          <small
                            className={"user_location"}
                            style={{ color: "#2ad19b" }}
                          >
                            Vancouver
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={"centerVH user_info_outer"}>
                    <IoIosPerson className={"person_logo"} />
                    <div className={"user_info_inner"}>
                      <p className={"user_email m_none"}>
                        jsmithjunior@gmail.com
                      </p>
                      <small
                        className={"user_location"}
                        style={{ color: "#fec400" }}
                      >
                        San Francisco
                      </small>
                    </div>
                  </div>
                  <div className={"centerVH user_info_outer"}>
                    <IoIosPerson className={"person_logo"} />
                    <div className={"user_info_inner"}>
                      <p className={"user_email m_none"}>
                        patschmidt@gmail.com
                      </p>
                      <small
                        className={"user_location"}
                        className={"user_location"}
                        style={{ color: "#fec400" }}
                      >
                        San Francisco
                      </small>
                    </div>
                  </div>
                  <div className={"centerVH user_info_outer"}>
                    <IoIosPerson className={"person_logo"} />
                    <div className={"user_info_inner"}>
                      <p className={"user_email m_none"}>kimjones@gmail.com</p>
                      <small
                        className={"user_location"}
                        style={{ color: "#bf5cff" }}
                      >
                        Edmonton
                      </small>
                    </div>
                  </div>
                </div>

                {/* Center Bottom Box */}
                <div className="Center_Bottom_Box inner_box">
                  <h5 className={"m_none inner_box_heading"}>
                    Staff Locations
                  </h5>
                  <div className={"centerVH chart_height"}>
                    <HorizontalBar
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        legend: {
                          display: false
                        },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                fontColor: "#a5a5a5",
                                fontSize: "16"
                              }
                            }
                          ],
                          xAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                fontColor: "#c5c5c5"
                              }
                            }
                          ]
                        }
                      }}
                      data={{
                        labels: ["Vancouver", "San Francisco", "Edmonton"],
                        datasets: [
                          {
                            label: "Number of Workers At Location",
                            barThickness: 4,
                            backgroundColor: ["#2ad19b", "#fec400", "#bf5cff"],
                            borderWidth: 2,
                            hoverBackgroundColor: "rgba(255,99,132,0.4)",
                            hoverBorderColor: "rgba(255,99,132,1)",
                            data: [usersLoggedIn.length, 2, 1, 1]
                          }
                        ]
                      }}
                    />
                  </div>
                </div>

                {/* Right Bottom Box */}
                <div className="Right_Bottom_Box inner_box">
                  <h5 className={"m_none inner_box_heading"}>
                    Incidents this Month
                  </h5>
                  <div className={"centerVH chart_height"}>
                    <Radar
                      options={{
                        responsive: true,
                        legend: {
                          display: false
                        },
                        scale: {
                          pointLabels: {
                            fontColor: "#a5a5a5",
                            fontSize: "16",
                            fontFamily: "Arial"
                          },
                          ticks: {
                            min: 0,
                            max: 5,
                            stepSize: 1,
                            backdropColor: "rgba(0,0,0,0)",
                            fontColor: "#c5c5c5"
                          },
                          gridLines: {
                            color: "#686868"
                          }
                        }
                      }}
                      data={{
                        labels: [
                          "Assault",
                          "Break and Enter",
                          `General Theft`,
                          "Property Damage",
                          "Property Damage",
                          "Public Intoxication",
                          "Vehicle Collision",
                          "Vehicle Theft"
                        ],
                        datasets: [
                          {
                            label: "Number of Incidents",
                            data: [3, 1, 3, 2, 4, 2, 3, 4],
                            borderColor: "rgba(24,220,255,0.7)",
                            backgroundColor: "rgba(24,220,255,0.05)",
                            borderWidth: 2
                          }
                        ]
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Pane */}
          <div className={"RP"}>
            <div></div>

            {/* Current Weather */}
            <div className={"centerVH"} style={{ width: "100%" }}>
              <Weather />
            </div>

            {/* Crime Feed */}
            <div className={"Crime_Feed_outer"}>
              <h5 className={"m_none inner_box_heading"}>Incident Feed</h5>
              <div style={{ width: "100%" }}>
                {console.log(incidentArray)}
                {incidentArray
                  .slice(-5)
                  .reverse()
                  .map(crime => (
                    <>
                      <NavLink
                        to={`/IncidentScreen/${crime.userId}/${crime.reportId}`}
                        className={"centerVH"}
                        activeStyle={{ background: "#202227" }}
                        className={`RP_button`}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: "0.75em",
                          textDecoration: "none",
                          width: "100%"
                        }}
                      >
                        {/* Incident */}
                        <p
                          className={"m_none"}
                          style={{ color: "#c5c5c5", opacity: "0.7" }}
                        >
                          {crime.incident}
                        </p>

                        {/* Incident Time */}
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          <BsClock
                            style={{
                              height: "0.75em",
                              width: "0.75em",
                              color: "white",
                              borderRadius: "100%"
                            }}
                          />
                          <small
                            style={{
                              color: "rgba(255,255,76, 0.7)",
                              paddingLeft: "0.5em"
                            }}
                          >
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                              hour: "numeric",
                              minute: "numeric"
                            }).format(Date.parse(crime.timestamp))}
                          </small>
                        </div>
                      </NavLink>
                    </>
                  ))}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Spinner />
        {/* <NavBar /> */}
      </div>
    );
  }
};

export default Dashboard;
