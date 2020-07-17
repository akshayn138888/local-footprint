import React from "react";
import LiveMapScreen from "./Screens/03_LiveMapScreen/LiveMapScreen";
import AuthScreen from "./Screens/02_AuthScreen/AuthScreen";
import HeroScreen from "./Screens/01_WelcomePage/HeroScreen";
import IncidentScreen from "./Screens/04_IncidentScreen/IncidentScreen";
import IncidentShowScreen from "./Screens/05_IncidentShowScreen/IncidentShowScreen";
import DashBoard from "./Screens/06_DashboardScreen/DashBoardScreen";
import Show from "./Screens/05_IncidentShowScreen/Show";
import "./App.css";
import LiveWorkerStats from "./Screens/07_LiveWorkerStats/LiveWorkerStats";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grommet } from "grommet";
import ReportStats from "./Screens/08_ReportStat/ReportsStats";
import WorkerTimeLapse from "./Screens/09_WorkerTimeLapse/WorkerTimeLapse";

function App() {
  return (
    <BrowserRouter>
      <Grommet>
        <Switch>
          <Route exact path="/" component={HeroScreen} />
          <Route exact path="/signin" component={AuthScreen} />
          <Route exact path="/LiveMapScreen" component={LiveMapScreen} />
          <Route
            exact
            path="/IncidentScreen/:userId/:reportId"
            component={Show}
          />
          <Route exact path="/IncidentScreen" component={IncidentScreen} />
          <Route exact path="/DashBoardScreen" component={DashBoard} />
          <Route exact path="/LiveWorkerStats" component={LiveWorkerStats} />
          <Route exact path="/ReportStats" component={ReportStats} />
          <Route exact path="/WorkerTimeLapse" component={WorkerTimeLapse} />
        </Switch>
      </Grommet>
    </BrowserRouter>
  );
}

export default App;
