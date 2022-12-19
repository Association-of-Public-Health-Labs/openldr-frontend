import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import TempPrivateRoute from "./components/TempPrivateRoute";

import Dashboard from "./pages/Dashboard";
import Lab from "./pages/Lab";
import Clinic from "./pages/Clinic";
import WeeklyReports from "./pages/WeeklyReports"
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Covid19 from "./pages/covid19/Dashboard";
import Covid19Results from "./pages/covid19/Results";
import SamplesIndicators from "./pages/covid19/SamplesIndicators";
import QrResult from "./pages/covid19/QrResult";

export default function Routes() {
  return (
    <BrowserRouter>
      {/* <Route path="/" exact component={Login} /> */}
      <Route path="/" component={Dashboard} />
      <Route path="/lab" component={Lab} />
      <Route path="/clinic" component={Clinic} />
      <Route path="/weeklyreports" component={WeeklyReports} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/covid/:id" component={QrResult} />
      <PrivateRoute path="/covid19" component={Covid19} />
      <PrivateRoute path="/samples/:province" component={SamplesIndicators} />
      <TempPrivateRoute path="/covid19results" component={Covid19Results} />
    </BrowserRouter>
  );
}
