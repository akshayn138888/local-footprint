import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const MapScreen = props => {
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
            <button class="marker-btn">
              <img
                src="https://cdn.imgbin.com/12/4/19/imgbin-auxiliary-police-lawyer-material-people-s-police-UcqivXX1JKh98eQ2xMj1Zyan2.jpg"
                alt="security guard"
                style={{ width: 50 }}
              />
            </button>
          </Marker>
        );
      }
      parseData.push(array1);
    }
    //console.log(parseData);
    return (
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/akkin13/ckb1qv50i0grp1inr5bx1qkfm"
          onViewportChange={viewport => setViewport(viewport)}
        >
          {parseData
            ? parseData.map(markerArray => markerArray[markerArray.length - 1])
            : ""}
        </ReactMapGL>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};
export default MapScreen;
