import React, { useState, useEffect } from "react";
import DisplayReport from "./components/IncidentDisplayReports";
import LiveMapScreen from "./Screens/03_LiveMapScreen/LiveMapScreen";
import AuthScreen from "./Screens/02_AuthScreen/AuthScreen";
import WelcomeScreen from "./Screens/01_WelcomePage/WelcomeScreen";
import IncidentMapScreen from "./components/IncidentMapScreen";
import IncidentScreen from "./Screens/04_IncidentScreen/IncidentScreen";
import IncidentShowScreen from "./Screens/05_IncidentShowScreen/IncidentShowScreen";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grommet } from "grommet";

function App() {
  return (
    <BrowserRouter>
      <Grommet>
        <Switch>
          <Route exact path="/" component={WelcomeScreen} />
          <Route exact path="/signin" component={AuthScreen} />
          <Route exact path="/LiveMapScreen" component={LiveMapScreen} />
          <Route
            exact
            path="/IncidentScreen/:userId/:reportId"
            component={IncidentShowScreen}
          />
          <Route exact path="/IncidentScreen" component={IncidentScreen} />
        </Switch>
      </Grommet>
    </BrowserRouter>
  );
}

export default App;
