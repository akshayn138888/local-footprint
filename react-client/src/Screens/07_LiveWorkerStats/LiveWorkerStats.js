import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import NavBar from "../../components/NavBar/NavBar";
import WorkerNavBar from "../../components/topNavBar/WorkerNavBar";

const LiveWorkerStats = props => {
  const [latLon, setLatLon] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.88886313338101,
    zoom: 12,
    pitch: 60,
    bearing: -36,

    width: "100vw",
    height: "100vh"
  });
  console.log(viewport.zoom);

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
    const data = [];
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
            <img
              src="./04_Incident/01_Worker.png"
              alt="security guard"
              style={{ width: `8%` }}
            />
          </Marker>
        );

        data.push({
          COORDINATES: [
            parseFloat(value1.longitude),
            parseFloat(value1.latitude)
          ]
        });
      }
      parseData.push(array1);
    }

    //Line Layer
    // const layers = [new LineLayer({ id: "line-layer", data })];

    // Hexagon Layer
    const COLOR_RANGE = [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ];
    const layer = new HexagonLayer({
      id: "hexagon-layer",
      data,
      colorRange: COLOR_RANGE,
      pickable: true,
      extruded: true,
      radius: 10,
      elevationScale: 4,
      getPosition: d => d.COORDINATES
    });

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
          <DeckGL viewState={viewport} layers={[layer]} />

          <WorkerNavBar />
        </ReactMapGL>
      </div>
    );
  } else {
    return (
      <div>
        <WorkerNavBar />
      </div>
    );
  }
};
export default LiveWorkerStats;
