import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./IncidentShowScreen.css";

import Weather from "../../components/Weather/Weather";
import Spinner from "../../components/spinner/Spinner";
import { BsClock } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import DashBoardLP from "../../components/DashBoardLP";

const Show = props => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [report1, setReport1] = useState(null);
  const { userId, reportId } = props.match.params;
  const [report, setReport] = useState(null);
  //   const [users, setUsers] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.112312312,
    zoom: 10,
    width: "100vw",
    height: "100vh"
  });

  useEffect(() => {
    fetch("https://location-app-5d3d8.firebaseio.com/images.json", {
      method: "GET"
    })
      .then(e => e.json())
      .then(data => {
        console.log("request made reports");
        setReport(data);
      });
    // New PART
    // fetch("https://location-app-5d3d8.firebaseio.com/locations.json", {
    //   method: "GET"
    // })
    //   .then(e => e.json())
    //   .then(users => {
    //     //console.log(data);
    //     setUsers(users);
    //     console.log("request made for users");
    //   });
    fetch(
      `https://location-app-5d3d8.firebaseio.com/images/${userId}/${reportId}.json`,
      {
        method: "GET"
      }
    )
      .then(e => e.json())
      .then(data => {
        console.log(data);
        setReport1(data);
        setViewport({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          zoom: 7,
          width: "100vw",
          height: "100vh"
        });
      });
  }, []);

  if (report && report1) {
    ////////// Live report Data ????///////////////////////
    let hashMap = {};
    let count = 0;
    let incidentArray = [];
    for (let [key, value] of Object.entries(report)) {
      // console.log(value);
      for (let [key1, value1] of Object.entries(value)) {
        incidentArray.push({ userId: key, reportId: key1, ...value1 });
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
                <h2 className="m_none">{report1.title}</h2>
              </h4>

              {/* Top Box */}
              <div
                className="Top_Box inner_box"
                style={{ overflow: "hidden", height: "75vh" }}
              >
                <img
                  src={report1.url}
                  alt="report-lol"
                  style={{
                    width: "100%",
                    borderRadius: "2em",
                    height: "75vh"
                  }}
                />
              </div>
              {/* <h5 className={"m_none inner_box_heading"}>
                    Incidents this Month
                  </h5> */}

              <div
                className="inner_box"
                style={{ overflow: "hidden", minHeight: "20vh" }}
              >
                <h5 className={"m_none inner_box_heading"}>
                  {report1.incident} Reported by:{" "}
                  {report1.userEmail.split("@")[0]}
                </h5>
                <p className="m_none">{report1.description}</p>
              </div>

              {/* Center Bottom Box */}
              <div
                // className="Top_Box inner_box"
                style={{
                  padding: "0",
                  margin: "0",
                  overflow: "hidden",
                  height: "75vh",
                  width: "100%",
                  borderRadius: "2em"
                }}
              >
                <ReactMapGL
                  {...viewport}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  mapStyle="mapbox://styles/mapbox/dark-v9"
                  onViewportChange={viewport => setViewport(viewport)}
                >
                  <Marker
                    latitude={parseFloat(report1.latitude)}
                    longitude={parseFloat(report1.longitude)}
                  >
                    <button className="btnIncidentShow"></button>
                  </Marker>
                </ReactMapGL>
              </div>
              {/* Right Bottom Box */}
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
            <div className={"Crime_Feed_outer incident-feed"}>
              <h5 className={"m_none inner_box_heading"}>Report Feed</h5>
              <div style={{ width: "100%" }}>
                {console.log(incidentArray)}
                {incidentArray
                  .slice(-5)
                  .reverse()
                  .map(crime => (
                    <>
                      <NavLink
                        to={`/IncidentScreen/${crime.userId}/${crime.reportId}`}
                        onClick={() => {
                          return props.history.push(
                            `/IncidentScreen/${crime.userId}/${crime.reportId}`
                          );
                        }}
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

export default Show;
