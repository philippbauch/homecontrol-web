import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomesProvider } from "./contexts/HomesContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { useUserState } from "./contexts/UserContext";
import { useDefaultRoute, useWebSocket } from "./hooks";
import { Layout } from "./layout";
import {
  AddHome,
  AddUser,
  Home,
  Homes,
  Invitations,
  User,
  Users,
} from "./pages";

export const App: React.FunctionComponent = () => {
  const defaultRoute = useDefaultRoute();
  const user = useUserState();
  const { ws } = useWebSocket();

  useEffect(() => {
    if (user) {
      ws.connect();
    } else {
      ws.disconnect();
    }
  }, [user, ws]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <HomesProvider>
      <NotificationProvider>
        <Layout>
          <Switch>
            <Route component={Homes} exact={true} path="/homes" />
            <Route component={AddHome} path="/homes/new" />
            <Route component={Home} path="/homes/:homeId" />
            <Route component={Invitations} path="/invitations" />
            <Route component={Users} exact={true} path="/users" />
            <Route component={AddUser} path={"/users/new"} />
            <Route component={User} path="/users/:userId" />
            <Redirect to={defaultRoute} />
          </Switch>
        </Layout>
      </NotificationProvider>
    </HomesProvider>
  );
};
