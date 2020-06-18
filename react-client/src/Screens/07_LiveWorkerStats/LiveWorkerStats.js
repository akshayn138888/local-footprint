import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import NavBar from "../../components/NavBar/NavBar";

const LiveWorkerStats = props => {
  const [latLon, setLatLon] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.88886313338101,
    zoom: 9,
    pitch: 45,

    width: "100vw",
    height: "100vh"
  });
  console.log(viewport.zoom);

  //   const data = [
  //     { COORDINATES: [-122.88886313338101, 49.121706917599885] },
  //     { COORDINATES: [-122.88886313338101, 49.121706917599885] },
  //     { COORDINATES: [-122.88886313338101, 49.121706917599885] },
  //     { COORDINATES: [-122.00886313338101, 49.17706917599885] },
  //     { COORDINATES: [-122.88886313338101, 49.159706917599885] },
  //     { COORDINATES: [-122.7686313338101, 49.19706917599885] },
  //     { COORDINATES: [-122.89886313338101, 49.189706917599885] },
  //     { COORDINATES: [-122.34313338101, 49.119706917599885] },
  //     { COORDINATES: [-122.21886313338101, 49.169706917599885] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599885] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599885] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599881] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599883] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599885] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599886] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599889] },
  //     { COORDINATES: [-122.1186313338101, 49.15970691759988] },
  //     { COORDINATES: [-122.1186313338101, 49.159706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] },
  //     { COORDINATES: [-122.196313338101, 49.156706917599885] }
  //   ];
  //   const data = [
  //     {
  //       sourcePosition: [-122.88886313338101, 49.119706917599885],
  //       targetPosition: [-122.88886313338101, 49.43706917599885]
  //     }
  //   ];

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
      radius: 20,
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
          <NavBar />
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
export default LiveWorkerStats;
