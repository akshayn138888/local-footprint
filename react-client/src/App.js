import React, { useState, useEffect } from "react";
import DisplayReport from "./Screens/components/IncidentDisplayReports";
import LiveMapScreen from "./Screens/LiveMapScreen";
import AuthScreen from "./Screens/AuthScreen";
import WelcomeScreen from "./Screens/WelcomeScreen";
import IncidentMapScreen from "./Screens/components/IncidentMapScreen";
import IncidentScreen from "./Screens/IncidentScreen";
import IncidentShowScreen from "./Screens/IncidentShowScreen";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grommet } from "grommet";

function App() {
  return (
    <BrowserRouter>
      <Grommet>
        <Switch>
          {/* <DisplayReport /> */}
          {/* <MapScreen /> */}
          {/* <Auth /> */}
          {/* <IncidentShowScreen /> */}
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
