import React, { useContext } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { UserList } from "./UserList";
import { Page } from "../../layout";
import { AddUser } from "../AddUser";
import { UserContext } from "../../contexts/UserContext";

export const Users: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);

  const getDefaultRoute = () => {
    const { activeHomeId } = user.preferences;

    return activeHomeId ? `/homes/${activeHomeId}` : "/homes";
  };

  if (!user.admin) {
    return <Redirect to={getDefaultRoute()} />;
  }

  const action = <Link to={`/users/new`}>Erstellen</Link>;

  return (
    <Switch>
      <Route component={AddUser} path={`/users/new`} />
      <Route>
        <Page action={action} title="Benutzer">
          <UserList />
        </Page>
      </Route>
    </Switch>
  );
};
