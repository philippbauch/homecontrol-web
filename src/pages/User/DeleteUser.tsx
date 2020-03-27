import React, { useState } from "react";
import { Button } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { Page } from "../../layout";

interface DeleteUserProps {
  userId?: string;
}

export const DeleteUser: React.FunctionComponent<DeleteUserProps> = ({
  userId
}) => {
  const [loading, setLoading] = useState(false);

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/users",
      title: "Benutzer"
    },
    {
      link: `/users/${userId}`,
      title: "admin"
    }
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    console.log("Delete user");
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
