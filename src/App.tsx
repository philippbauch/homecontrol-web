import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { DeviceDetails, Devices, Home } from "./pages";

export const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <Switch>
        <Route exact={true} path="/devices">
          <Devices />
        </Route>
        <Route path="/devices/:deviceId">
          <DeviceDetails />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Layout>
  );
};
