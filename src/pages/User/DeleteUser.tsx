import React, { useState } from "react";
import { Button } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { Page } from "../../layout";
import http from "../../HttpClient";

interface DeleteUserProps {
  user: any;
}

export const DeleteUser: React.FunctionComponent<DeleteUserProps> = ({
  user
}) => {
  const [loading, setLoading] = useState(false);

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/users",
      title: "Benutzer"
    },
    {
      link: `/users/${user._id}`,
      title: user.identifier
    }
  ];

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    http.delete(`/users/${user._id}`).finally(() => setLoading(false));
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
