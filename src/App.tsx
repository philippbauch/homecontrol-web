import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Notifications } from "./components/Notifications";
import { HomesProvider } from "./contexts/HomesContext";
import { useUserState } from "./contexts/UserContext";
import { useDefaultRoute } from "./hooks";
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
  const user = useUserState();
  const defaultRoute = useDefaultRoute();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <HomesProvider>
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
      <Notifications />
    </HomesProvider>
  );
};
