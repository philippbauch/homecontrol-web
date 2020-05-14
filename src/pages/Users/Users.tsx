import React from "react";
import { Link, Redirect } from "react-router-dom";
import { UserList } from "./UserList";
import { useUserState } from "../../contexts/UserContext";
import { Page } from "../../layout";

export const Users: React.FunctionComponent = () => {
  const user = useUserState();

  if (!user.admin) {
    return <Redirect to={"/courses"} />;
  }

  const extra = <Link to={"/users/new"}>Erstellen</Link>;

  return (
    <Page extra={extra} title="Benutzer">
      <UserList />
    </Page>
  );
};
