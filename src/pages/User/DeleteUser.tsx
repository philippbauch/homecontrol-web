import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { useLogout } from "../../contexts/UserContext";
import http from "../../HttpClient";
import { Page } from "../../layout";

interface DeleteUserProps {
  ownUser: boolean;
  user: any;
}

export const DeleteUser: React.FunctionComponent<DeleteUserProps> = ({
  ownUser,
  user,
}) => {
  const history = useHistory();
  const logout = useLogout();
  const [loading, setLoading] = useState(false);

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/users",
      title: "Benutzer",
    },
    {
      link: `/users/${user._id}`,
      title: user.identifier,
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    http
      .delete(`/users/${user._id}`)
      .then(() => {
        if (ownUser) {
          return logout();
        }

        history.push("/users");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Account löschen">
      <form id="delete-user-form" onSubmit={handleFormSubmit}>
        <p>Diese Aktion kann nicht rückgängig gemacht werden.</p>
        <Button align="start" kind="danger" loading={loading} type="submit">
          Löschen
        </Button>
      </form>
    </Page>
  );
};
