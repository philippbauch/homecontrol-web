import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserList } from "./UserList";
import { UserContext } from "../../contexts/UserContext";
import { Page } from "../../layout";
import { useDefaultRoute } from "../../hooks";

export const Users: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const defaultRoute = useDefaultRoute();

  if (!user.admin) {
    return <Redirect to={defaultRoute} />;
  }

  const extra = <Link to={"/users/new"}>Erstellen</Link>;

  return (
    <Page extra={extra} title="Benutzer">
      <UserList />
    </Page>
  );
};
