import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Home, Login } from "./pages";
import { Layout } from "./layout/Layout";

export const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact={true}>
          <Login></Login>
        </Route>
        <Layout>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="">
            <Redirect to="/home"></Redirect>
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};
