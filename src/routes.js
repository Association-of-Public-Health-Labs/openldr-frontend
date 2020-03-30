import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import Lab from "./pages/Lab";
import Clinic from "./pages/Clinic";

export default function Routes() {
  return (
    <BrowserRouter>
      {/* <Route path="/" exact component={Login} /> */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/lab" component={Lab} />
      <Route path="/clinic" component={Clinic} />
      {/* <PrivateRoute path="/main" component={Main} /> */}
    </BrowserRouter>
  );
}
