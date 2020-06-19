import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import ReportNavBar from "./topNavBar/ReportNavBar";
const IncidentMapScreen = props => {
  const [popupToggler, setPopupToggler] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [latLon, setLatLon] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.88886313338101,
    zoom: 8,
    width: "100vw",
    height: "100vh"
  });

  useEffect(() => {
    // const interval = setInterval(() => {
    fetch("https://location-app-5d3d8.firebaseio.com/images.json", {
      method: "GET"
    })
      .then(e => e.json())
      .then(data => {
        console.log("request made");
        setLatLon(data);
      });
    // }, 10000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  if (latLon) {
    let parseData = [];
    for (let [key, value] of Object.entries(latLon)) {
      // console.log(value);

      for (let [key1, value1] of Object.entries(value)) {
        let title = value1.title;
        let srcIncident = "";
        if (value1.incident === "Assault") {
          srcIncident = "./04_Incident/Assault.png";
        } else if (value1.incident === "Break and Enter") {
          srcIncident = "./04_Incident/Break_and_Enter.png";
        } else if (value1.incident === "General Theft") {
          srcIncident = "./04_Incident/General_Theft.png";
        } else if (value1.incident === "Property Damage") {
          srcIncident = "./04_Incident/Property_Damage.png";
        } else if (value1.incident === "Public Intoxication") {
          srcIncident = "./04_Incident/Public_Intoxication.png";
        } else if (value1.incident === "Vehicle Collision") {
          srcIncident = "./04_Incident/Vehicle_Collision.png";
        } else if (value1.incident === "Vehicle Theft") {
          srcIncident = "./04_Incident/Vehicle_Theft.png";
        }

        parseData.push(
          <Marker
            latitude={parseFloat(value1.latitude)}
            longitude={parseFloat(value1.longitude)}
          >
            <button
              onClick={e => {
                setSelectedIncident({
                  data: value1,
                  userId: key,
                  reportId: key1
                });
                setPopupToggler(true);
              }}
              className="btnIncident"
              style={{ backgroundImage: `url(${srcIncident})` }}
            >
              {/* <img
                src={srcIncident}
                alt="security guard"
                style={{ width: "100%" }}
              /> */}
            </button>
          </Marker>
        );
      }
    }

    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/akkin13/ckb1qv50i0grp1inr5bx1qkfm"
          onViewportChange={viewport => setViewport(viewport)}
        >
          {parseData ? parseData.map(markerArray => markerArray) : ""}

          {selectedIncident ? (
            <Popup
              latitude={parseFloat(selectedIncident.data.latitude)}
              longitude={parseFloat(selectedIncident.data.longitude)}
              closeOnClick={false}
              onClose={() => {
                setSelectedIncident(null);
              }}
              className="apple-popup"
            >
              <div>
                <h5 className="popuptitle">{selectedIncident.data.title}</h5>
                <p className="popupdate">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(Date.parse(selectedIncident.data.timestamp))}
                </p>
                <p className="popupdescription">
                  {selectedIncident.data.description}
                </p>
                <a
                  style={{ color: "#1f4568" }}
                  href={`/IncidentScreen/${selectedIncident.userId}/${selectedIncident.reportId}`}
                >
                  More Details
                </a>
              </div>
            </Popup>
          ) : (
            ""
          )}
          <ReportNavBar />
          <NavBar />
        </ReactMapGL>
      </div>
    );
  } else {
    return (
      <div>
        <ReportNavBar />
        <NavBar />
      </div>
    );
  }
};
export default IncidentMapScreen;
