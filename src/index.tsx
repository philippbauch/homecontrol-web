import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { App, Login } from "./pages";
import * as serviceWorker from "./serviceWorker";
import "./styles/main.scss";

const Root: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact={true}>
          <Login></Login>
        </Route>
        <Route path="">
          <App />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
