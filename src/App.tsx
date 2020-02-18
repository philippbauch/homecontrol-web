import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Devices, Home, Login } from "./pages";
import { Layout } from "./layout/Layout";

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Layout>
          <Switch>
            <Route path="/devices">
              <Devices />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Layout>
      </Switch>
    </Router>
  );
};
