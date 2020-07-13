import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import ReportNavBar from "../../components/topNavBar/ReportNavBar";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import NavBar from "../../components/NavBar/NavBar";
import Spinner from "../../components/spinner/Spinner";
import GhostButton from "../../components/ghostButtons/GhostButton";
const ReportStats = props => {
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
    let data = [];
    for (let [key, value] of Object.entries(latLon)) {
      // console.log(value);

      for (let [key1, value1] of Object.entries(value)) {
        let weight = 0;

        if (value1.incident === "Assault") {
          weight = 10;
        } else if (value1.incident === "Break and Enter") {
          weight = 7;
        } else if (value1.incident === "General Theft") {
          weight = 5;
        } else if (value1.incident === "Property Damage") {
          weight = 3;
        } else if (value1.incident === "Public Intoxication") {
          weight = 2;
        } else if (value1.incident === "Vehicle Collision") {
          weight = 1;
        } else if (value1.incident === "Vehicle Theft") {
          weight = 8;
        }
        data.push({
          COORDINATES: [
            parseFloat(value1.longitude),
            parseFloat(value1.latitude)
          ],
          WEIGHT: weight
        });
      }
    }
    const layer = new HeatmapLayer({
      id: "heatmapLayer",
      data,
      getPosition: d => d.COORDINATES,
      getWeight: d => d.WEIGHT
    });
    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={viewport => setViewport(viewport)}
        >
          <DeckGL viewState={viewport} layers={[layer]} />
          <GhostButton />
        </ReactMapGL>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <ReportNavBar />
        <Spinner />
      </div>
    );
  }
};
export default ReportStats;
