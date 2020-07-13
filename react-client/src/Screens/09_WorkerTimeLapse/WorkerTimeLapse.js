/* global window */
import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { TripsLayer } from "@deck.gl/geo-layers";
import WorkerNavBar from "../../components/topNavBar/WorkerNavBar";
import NavBar from "../../components/NavBar/NavBar";
import GhostButton from "../../components/ghostButtons/GhostButton";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmRpY2siLCJhIjoiY2thbmdvYXJrMXFhZDJ3bGUzc3N4b29kYSJ9.4gZnKOxNEQ9WXEkFym7lTQ";

const INITIAL_VIEW_STATE = {
  longitude: -122.88886313338101,
  latitude: 49.119706917599885,
  zoom: 10.5,
  pitch: 45,
  bearing: 0
};

const WorkerTimeLapse = () => {
  const [time1, setTime1] = useState(0);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [data, setData] = useState(null);

  useEffect(() => {
    window.requestAnimationFrame(_animate);

    return () => {
      window.cancelAnimationFrame(_animate);
    };
  }, [time1]);

  const _animate = () => {
    const loopLength = 1800; // unit corresponds to the timestamp in source data
    const animationSpeed = 30; // unit time per second

    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;

    setTime1(((timestamp % loopTime) / loopTime) * loopLength);
  };

  const _renderLayers = () => {
    return [
      new TripsLayer({
        id: "trips",
        data:
          "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json",
        getPath: each =>
          each.path.map(p => {
            return [p[0] - 48.855, p[1] + 8.45];
          }),
        getTimestamps: d => d.timestamps,
        getColor: d => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
        opacity: 0.3,
        widthMinPixels: 2,
        rounded: true,
        trailLength: 100,
        currentTime: time1,
        shadowEnabled: false
      })
    ];
  };

  return (
    <DeckGL
      layers={_renderLayers()}
      initialViewState={viewState}
      onViewportChange={viewport => setViewState(viewport)}
      controller={true}
    >
      <StaticMap
        reuseMaps
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      <GhostButton />
    </DeckGL>
  );
};

export default WorkerTimeLapse;
