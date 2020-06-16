import React from "react";
import LiveMapScreen from "./Screens/03_LiveMapScreen/LiveMapScreen";
import AuthScreen from "./Screens/02_AuthScreen/AuthScreen";
import WelcomeScreen from "./Screens/01_WelcomePage/WelcomeScreen";
import IncidentScreen from "./Screens/04_IncidentScreen/IncidentScreen";
import IncidentShowScreen from "./Screens/05_IncidentShowScreen/IncidentShowScreen";
import DashBoardScreen from "./Screens/06_DashboardScreen/DashBoardScreen";
import "./App.css";
import LiveWorkerStats from "./Screens/07_LiveWorkerStats/LiveWorkerStats";
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
          <Route exact path="/DashBoardScreen" component={DashBoardScreen} />
          <Route exact path="/LiveWorkerStats" component={LiveWorkerStats} />
        </Switch>
      </Grommet>
    </BrowserRouter>
  );
}

export default App;
