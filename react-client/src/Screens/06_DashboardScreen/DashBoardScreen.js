import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import NavBar from "../../components/NavBar/NavBar.js";
import Weather from "../../components/Weather/Weather";
import Spinner from "../../components/spinner/Spinner";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { BsMap, BsClock } from "react-icons/bs";
import { IoIosPerson } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Line, Radar, HorizontalBar } from 'react-chartjs-2';


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
    let currentAddress = []
    let set1 = new Set();
    for (let [key, value] of Object.entries(users)) {
      let allAddresses = []
      for (let [key1, value1] of Object.entries(value)) {
        if (value1.timestamp) {

          if ((new Date() - Date.parse(value1.timestamp)) / (1000 * 60) < 1000000) {
            // if ((new Date() - Date.parse(value1.timestamp)) / (1000 * 60) < 15) {
            set1.add(value1.userEmail)
            allAddresses.push({ latitude: `${value1.latitude}`, longitude: `${value1.longitude}`, })
          }
        }
      }
      currentAddress.push(allAddresses[allAddresses.length - 1])
    }
    let usersLoggedIn = Array.from(set1)

    ////////// Live report Data ????///////////////////////
    let hashMap = {};
    let count = 0;
    let incidentArray = [];
    let recentCrime = []
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
        <div style={{ height: "100vh", width: "100vw", background: '#202227' }}>
          {/* Left Pane */}
          <div className={"LP"}>
            <div className={"centerVH"}>
              <h5
                className="header__logo__title"
                style={{ display: "flex", alignItems: "center" }}
              >

                <span style={{ color: "#3794D7" }}>Local</span>{" "}
                <span className="footer__black" style={{ color: "white" }}>Footprint</span>
              </h5>
            </div>
            <div className={"centerVH_FDC"}>
              <img className={"LP_photo"} src="https://annemariesegal.files.wordpress.com/2017/06/img_0422-linkedin-size-smiling-man-in-suit.png?w=750&h=742" />
              <h4>John Smith</h4>
            </div>
            <NavLink to="/DashBoardScreen" activeStyle={{ color: "white" }} className={"centerVH_FDC LP_button"}>
              <AiOutlineHome size={"3em"} />
                Home
            </NavLink>

            <NavLink to="/LiveMapScreen" className={"centerVH_FDC LP_button"}>
              <FaUserFriends size={"3em"} />
              <span style={{ color: "white" }}>Live Staff Map</span>

            </NavLink>
            <NavLink to="IncidentScreen" className={"centerVH_FDC LP_button"}>
              <BsMap size={"3em"} />
              <span style={{ color: "white" }}>Report Map</span>
            </NavLink>
          </div>

          {/* Center Pane */}
          <div style={{ paddingLeft: 225, paddingRight: 325, paddingTop: "1em", color: '#606060' }}>
            <div style={{ display: "flex", flexDirection: "column", flexWrap: 'wrap', padding: 5 }}>

              <h4 style={{ width: "100%", color: "white", margin: 5 }}>Incident Statistics</h4>

              {/* Top Box */}
              <div style={{ width: "100%", height: "40vh", marginTop: "2em", backgroundColor: "#2A2E32", borderRadius: "5%", padding: "1em" }}>
                <h5 className={"m_none"} style={{ marginBottom: '2em' }}>Incidents This Month</h5>
                <div style={{ height: '80%' }}>
                  <Line

                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                      }
                    }}

                    data={{
                      labels: ['Jan', 'Feb.', `Mar`, 'April', 'May', 'June', 'July'],
                      datasets: [{
                        label: "Total Incidents This Month",
                        data: [12, 10, 6, 8, 9, 10, 18],
                        borderColor: 'rgba(255,255,76, 0.7)',
                        backgroundColor: 'rgba(255,255,76, 0.05)',
                        borderWidth: 2
                      }]
                    }} />
                </div>
              </div>


              <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: "space-between", marginTop: "1em" }}>

                {/* Left Bottom Box */}
                <div style={{ width: "23%", minWidth: '280px', height: "45vh", backgroundColor: "#2A2E32", borderRadius: "5%", padding: '1em' }}>
                  <h5 className={"m_none"} style={{ marginBottom: "1em", textAlign: 'center' }}>On Duty Staff</h5>
                  <div>
                    {usersLoggedIn.map(userEmail => (
                      <div className={'centerVH'} style={{ justifyContent: 'flex-start', marginBottom: '1.5em' }}>
                        <IoIosPerson style={{ height: '2em', width: '2em', border: '1px solid white', borderRadius: '100%' }} />
                        <div style={{ paddingLeft: '0.75em' }}>
                          <p className={"m_none"} style={{ color: "#c5c5c5", opacity: '0.7' }}>{userEmail}</p>
                          <small style={{ color: "rgba(255,255,76, 0.4)" }}>Vancouver</small>
                        </div>
                      </div>
                    )
                    )}
                  </div>
                  <div className={'centerVH'} style={{ justifyContent: 'flex-start', marginBottom: '1.5em' }}>
                    <IoIosPerson style={{ height: '2em', width: '2em', border: '1px solid white', borderRadius: '100%' }} />
                    <div style={{ paddingLeft: '0.75em' }}>
                      <p className={"m_none"} style={{ color: "#c5c5c5", opacity: '0.7' }}>jsmithjunior@gmail.com</p>
                      <small style={{ color: "rgba(255,255,76, 0.4)" }}>San Fransico</small>
                    </div>
                  </div>
                  <div className={'centerVH'} style={{ justifyContent: 'flex-start', marginBottom: '1.5em' }}>
                    <IoIosPerson style={{ height: '2em', width: '2em', border: '1px solid white', borderRadius: '100%' }} />
                    <div style={{ paddingLeft: '0.75em' }}>
                      <p className={"m_none"} style={{ color: "#c5c5c5", opacity: '0.7' }}>patschmidt@gmail.com</p>
                      <small style={{ color: "rgba(255,255,76, 0.4)" }}>San Fransico</small>
                    </div>
                  </div>
                  <div className={'centerVH'} style={{ justifyContent: 'flex-start', marginBottom: '1.5em' }}>
                    <IoIosPerson style={{ height: '2em', width: '2em', border: '1px solid white', borderRadius: '100%' }} />
                    <div style={{ paddingLeft: '0.75em' }}>
                      <p className={"m_none"} style={{ color: "#c5c5c5", opacity: '0.7' }}>kimjones@gmail.com</p>
                      <small style={{ color: "rgba(255,255,76, 0.4)" }}>Edmonton</small>
                    </div>
                  </div>
                </div>

                {/* Center Bottom Box */}
                <div style={{ width: "26%", height: "45vh", backgroundColor: "#2A2E32", borderRadius: "5%", padding: '1em 1em 1em 0.25em ' }}>
                  <h5 className={"m_none"} style={{ marginBottom: '1em', textAlign: "center" }}>Staff Locations</h5>
                  <div className={"centerVH"} style={{ height: '85%' }}>
                    <HorizontalBar
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        legend: {
                          display: false,
                        },
                        scales: {
                          yAxes: [{
                            ticks: {
                              fontColor: "#c5c5c5",
                              fontSize: "14",
                            },
                          }],
                          xAxes: [{
                            ticks: {
                              beginAtZero: true,
                              fontColor: "#c5c5c5"
                            },
                          }]
                        }
                      }}
                      data={{
                        labels: ['Vancouver', 'San Francisco', 'Edmonton'],
                        datasets: [
                          {
                            label: 'Number of Workers At Location',
                            barThickness: 20,
                            borderColor: 'rgba(255,255,76, 0.7)',
                            backgroundColor: 'rgba(255,255,76, 0.05)',
                            borderWidth: 2,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: [usersLoggedIn.length, 2, 1, 1]
                          }
                        ]
                      }} />
                  </div>
                </div>

                {/* Right Bottom Box */}
                <div style={{ width: "49%", height: "45vh", backgroundColor: "#2A2E32", borderRadius: "5%", padding: `1em` }}>
                  <h5 className={"m_none"} style={{ marginBottom: "1em", textAlign: "center" }}>Incidents this Month</h5>
                  <Radar
                    options={{
                      responsive: true,
                      legend: {
                        display: false,
                      },
                      scale: {
                        pointLabels: {
                          fontColor: "#c5c5c5",
                          fontSize: "13",
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
                      labels: ['Assault', 'Break and Enter', `General Theft`, 'Property Damage', 'Property Damage', 'Public Intoxication', 'Vehicle Collision', 'Vehicle Theft'],
                      datasets: [{
                        label: 'Number of Incidents',
                        data: [3, 1, 3, 2, 4, 2, 3, 4],
                        borderColor: 'rgba(255,255,76, 0.7)',
                        backgroundColor: 'rgba(255,255,76, 0.05)',
                        borderWidth: 2
                      }]
                    }} />
                </div>
              </div>



            </div>
          </div>
          {/* Right Pane */}
          <div className={"RP"}>
            <div></div>

            {/* Current Weather */}
            <div className={'centerVH'} style={{ width: "100%" }}>
              <Weather />
            </div>

            {/* Crime Feed */}
            <div style={{ width: '100%', height: "45vh", borderRadius: "5%", marginTop: '1em' }}>
              <br></br>
              <h5 className={"m_none"} style={{ marginBottom: "1em", textAlign: 'center' }}>Incident Feed</h5>
              <div style={{ width: '100%' }}>
                {console.log(incidentArray)}
                {incidentArray.slice(-5).reverse().map(crime => (
                  <>

                    <NavLink to={`/IncidentScreen/${crime.userId}/${crime.reportId}`} className={'centerVH'} activeStyle={{ background: '#202227' }} className={`RP_button`} style={{ display: 'flex', flexDirection: "column", paddingLeft: '0.75em', textDecoration: 'none', width: '100%' }}>
                      {/* Incident */}
                      <p className={"m_none"} style={{ color: "#c5c5c5", opacity: '0.7' }}>{crime.incident}</p>

                      {/* Incident Time */}
                      <div style={{ width: '100%' }}>
                        <BsClock style={{ height: '0.75em', width: '0.75em', color: 'white', borderRadius: '100%' }} />
                        <small style={{ color: "rgba(255,255,76, 0.4)", paddingLeft: '0.5em' }}>
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
                )
                )}

              </div>
            </div>
          </div>
          <div>

          </div>
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
