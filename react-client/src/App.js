import React, { useState, useEffect } from "react";
import DisplayReport from "./Screens/DisplayReport";
import MapScreen from "./Screens/MapScreen";
import Auth from "./Screens/Auth";
import Welcome from "./Screens/Welcome";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <DisplayReport /> */}
        {/* <MapScreen /> */}
        {/* <Auth /> */}
        <Route exact path="/" component={Welcome} />
        <Route exact path="/signin" component={Auth} />
        <Route exact path="/MapScreen" component={MapScreen} />
        <Route exact path="/DisplayReport" component={DisplayReport} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
