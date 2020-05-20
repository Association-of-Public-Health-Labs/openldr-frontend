import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import Lab from "./pages/Lab";
import Clinic from "./pages/Clinic";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Covid19 from "./pages/covid19/Dashboard";
import Covid19Results from "./pages/covid19/Results";

export default function Routes() {
  return (
    <BrowserRouter>
      {/* <Route path="/" exact component={Login} /> */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/lab" component={Lab} />
      <Route path="/clinic" component={Clinic} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/covid19" component={Covid19} />
      <PrivateRoute path="/covid19results" component={Covid19Results} />
    </BrowserRouter>
  );
}
