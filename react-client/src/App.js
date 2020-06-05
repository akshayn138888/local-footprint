import React, { useState, useEffect } from "react";
import DisplayReport from "./Screens/DisplayReport";
import MapScreen from "./Screens/MapScreen";
import AuthScreen from "./Screens/AuthScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import IncidentMapScreen from "./Screens/IncidentMapScreen";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <DisplayReport /> */}
        {/* <MapScreen /> */}
        {/* <Auth /> */}
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/signin" component={AuthScreen} />
        <Route exact path="/MapScreen" component={MapScreen} />
        <Route exact path="/DisplayReport" component={DisplayReport} />
        <Route exact path="/IncidentMapScreen" component={IncidentMapScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
