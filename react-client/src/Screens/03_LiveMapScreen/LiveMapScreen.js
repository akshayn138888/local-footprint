import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import NavBar from "../../components/NavBar/NavBar";
import DeckGL from "@deck.gl/react";
import DashBoardLP from "../../components/DashBoardLP";

import Spinner from "../../components/spinner/Spinner";
import { TripsLayer } from "@deck.gl/geo-layers";
import GhostButton from "../../components/ghostButtons/GhostButton";
const MapScreen = props => {
  const [latLon, setLatLon] = useState(null);
  const [layer, setlayer] = useState(null);
  const [timer, setTimer] = useState(10);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.88886313338101,
    zoom: 10,
    width: "100vw",
    height: "100vh"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://location-app-5d3d8.firebaseio.com/locations.json", {
        method: "GET"
      })
        .then(e => e.json())
        .then(data => {
          //console.log(data);
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
      //console.log(value);
      let array1 = [];
      for (let [key1, value1] of Object.entries(value)) {
        let name = value1.userEmail.split("@")[0];

        array1.push(
          <Marker
            latitude={parseFloat(value1.latitude)}
            longitude={parseFloat(value1.longitude)}
          >
            <button
              onClick={e => {
                setSelectedWorker({
                  data: value1
                });
              }}
              className="btnIncident"
              style={{ backgroundImage: `url(./04_Incident/01_Worker.png)` }}
            >
              {/* <img
                src={srcIncident}
                alt="security guard"
                style={{ width: "100%" }}
              /> */}
            </button>
            {/* <img
              src="./04_Incident/01_Worker.png"
              alt="security guard"
              style={{ width: `8%` }}
            /> */}
          </Marker>
        );
      }
      parseData.push(array1);
    }
    console.log(parseData);
    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
          {parseData
            ? parseData.map(markerArray => markerArray[markerArray.length - 1])
            : ""}

          {selectedWorker ? (
            <Popup
              latitude={parseFloat(selectedWorker.data.latitude)}
              longitude={parseFloat(selectedWorker.data.longitude)}
              closeOnClick={false}
              onClose={() => {
                setSelectedWorker(null);
              }}
              className="apple-popup"
            >
              <div>
                <p className="popuptitle" style={{ textAlign: "center" }}>
                  {selectedWorker.data.userEmail.toLowerCase()}
                </p>
              </div>
            </Popup>
          ) : (
            ""
          )}
          <DashBoardLP />
          <GhostButton />
        </ReactMapGL>
      </div>
    );
  } else {
    return (
      <div>
        <DashBoardLP />
        <Spinner />
      </div>
    );
  }
};
export default MapScreen;
