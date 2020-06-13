import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import NavBar from './NavBar/NavBar'

const IncidentMapScreen = props => {
  const [latLon, setLatLon] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.88886313338101,
    zoom: 15,
    width: "100vw",
    height: "100vh"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://location-app-5d3d8.firebaseio.com/images.json", {
        method: "GET"
      })
        .then(e => e.json())
        .then(data => {
          console.log(data);
          setLatLon(data);
        });
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (latLon) {
    let parseData = [];
    for (let [key, value] of Object.entries(latLon)) {
      console.log(value);

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
            <img
              src={srcIncident}
              alt="security guard"
              style={{ width: "10%" }}
            />
          </Marker>
        );
      }
    }
    console.log(parseData);
    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/akkin13/ckb1qv50i0grp1inr5bx1qkfm"
          onViewportChange={viewport => setViewport(viewport)}
        >
          <NavBar />
          {parseData ? parseData.map(markerArray => markerArray) : ""}
        </ReactMapGL>
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
export default IncidentMapScreen;
