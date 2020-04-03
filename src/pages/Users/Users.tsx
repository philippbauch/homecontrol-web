import React from "react";
import { Link, Redirect } from "react-router-dom";
import { UserList } from "./UserList";
import { useUserState } from "../../contexts/UserContext";
import { useDefaultRoute } from "../../hooks";
import { Page } from "../../layout";

export const Users: React.FunctionComponent = () => {
  const user = useUserState();
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
