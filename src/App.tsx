import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomeProvider } from "./contexts/HomeContext";
import { UserContext } from "./contexts/UserContext";
import { Layout } from "./layout";
import { AddHome, Home, Homes, Invitations, Users } from "./pages";

export const App: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const getDefaultRoute = () => {
    const { activeHomeId } = user.preferences;

    return activeHomeId ? `/homes/${activeHomeId}` : "/homes";
  };

  return (
    <HomeProvider>
      <Layout>
        <Switch>
          <Route component={Homes} exact={true} path="/homes" />
          <Route component={AddHome} path="/homes/new" />
          <Route component={Home} path="/homes/:homeId" />
          <Route component={Invitations} path="/invitations" />
          <Route component={Users} path="/users" />
          <Redirect to={getDefaultRoute()} />
        </Switch>
      </Layout>
    </HomeProvider>
  );
};
