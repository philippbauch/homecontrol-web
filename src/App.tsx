import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomeProvider } from "./contexts/HomeContext";
import { UserContext } from "./contexts/UserContext";
import { Layout } from "./layout";
import {
  AddHome,
  AddUser,
  Home,
  Homes,
  Invitations,
  User,
  Users
} from "./pages";

export const App: React.FunctionComponent = () => {
  const { defaultRoute, user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <HomeProvider>
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
    </HomeProvider>
  );
};
