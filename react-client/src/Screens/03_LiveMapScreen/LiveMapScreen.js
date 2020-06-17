import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import NavBar from "../../components/NavBar/NavBar";
import DeckGL from "@deck.gl/react";

import { TripsLayer } from "@deck.gl/geo-layers";

const MapScreen = props => {
  const [latLon, setLatLon] = useState(null);
  const [layer, setlayer] = useState(null);
  const [timer, setTimer] = useState(10);
  const [viewport, setViewport] = useState({
    latitude: 49.119706917599885,
    longitude: -122.88886313338101,
    zoom: 10,
    width: "100vw",
    height: "100vh"
  });

  // const data = [
  //   {
  //     waypoints: [
  //       {
  //         coordinates: [-122.88886313338101, 49.119706917599885],
  //         timestamp: 1554772579000
  //       },
  //       {
  //         coordinates: [-122.88886313338101, 49.129706917599885],
  //         timestamp: 1554772579010
  //       },

  //       {
  //         coordinates: [-122.4485672, 49.139706917599885],
  //         timestamp: 1554772580200
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.149706917599885],
  //         timestamp: 1554772580200 + 1000
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.159706917599885],
  //         timestamp: 1554772580200 + 2000
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.169706917599885],
  //         timestamp: 1554772580200 + 3000
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.179706917599885],
  //         timestamp: 1554772580200 + 4000
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.189706917599885],
  //         timestamp: 1554772580200 + 5000
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.199706917599885],
  //         timestamp: 1554772580200 + 6000
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.209706917599885],
  //         timestamp: 1554772580200 + 7000
  //       },
  //       {
  //         coordinates: [-122.4485672, 49.219706917599885],
  //         timestamp: 1554772580200 + 8000
  //       },
  //       {
  //         coordinates: [-122.4585672, 49.229706917599885],
  //         timestamp: 1554772580200 + 9000
  //       },
  //       {
  //         coordinates: [-122.4685672, 49.239706917599885],
  //         timestamp: 1554772580200 + 10000
  //       }
  //     ]
  //   }
  // ];

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

  // useEffect(() => {
  //   const interval1 = setInterval(() => {
  //     const layer = new TripsLayer({
  //       id: "trips-layer",
  //       data,
  //       getPath: d => d.waypoints.map(p => p.coordinates),
  //       // deduct start timestamp from each data point to avoid overflow
  //       getTimestamps: d => d.waypoints.map(p => p.timestamp - 1554772579000),
  //       getColor: [253, 128, 93],
  //       opacity: 0.8,
  //       widthMinPixels: 50,
  //       rounded: true,
  //       trailLength: 1000,
  //       currentTime: timer
  //     });
  //     setTimer(timer + 500);
  //     setlayer(layer);
  //   }, 1000);

  // return () => {
  //   clearInterval(interval1);
  // };
  // }, []);

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
            <img
              src="./04_Incident/01_Worker.png"
              alt="security guard"
              style={{ width: `8%` }}
            />
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
          mapStyle="mapbox://styles/akkin13/ckb1qv50i0grp1inr5bx1qkfm"
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
          {parseData
            ? parseData.map(markerArray => markerArray[markerArray.length - 1])
            : ""}

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
export default MapScreen;
