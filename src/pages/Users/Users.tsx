import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserList } from "./UserList";
import { UserContext } from "../../contexts/UserContext";
import { Page } from "../../layout";

export const Users: React.FunctionComponent = () => {
  const { defaultRoute, user } = useContext(UserContext);

  if (!user.admin) {
    return <Redirect to={defaultRoute} />;
  }

  const action = <Link to={"/users/new"}>Erstellen</Link>;

  return (
    <Page action={action} title="Benutzer">
      <UserList />
    </Page>
  );
};
