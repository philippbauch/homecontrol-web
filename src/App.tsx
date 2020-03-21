import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomeProvider } from "./contexts/HomeContext";
import { Layout } from "./layout/Layout";
import { AddHome, Home, Homes } from "./pages";
import { UserContext } from "./contexts/UserContext";

export const App: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <HomeProvider>
      <Layout>
        <Switch>
          <Route component={Homes} exact={true} path="/homes" />
          <Route component={AddHome} path="/homes/new" />
          <Route component={Home} path="/homes/:homeId" />
          <Route>
            <Redirect
              to={
                user.preferences.activeHomeId
                  ? `/homes/${user.preferences.activeHomeId}`
                  : "/homes"
              }
            />
          </Route>
        </Switch>
      </Layout>
    </HomeProvider>
  );
};
