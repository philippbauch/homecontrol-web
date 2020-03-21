import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { App } from "./App";
import { UserProvider } from "./contexts/UserContext";
import { Login } from "./pages";
import "./styles/main.scss";

const Root: React.FunctionComponent = () => {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route component={App} />
        </Switch>
      </UserProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
