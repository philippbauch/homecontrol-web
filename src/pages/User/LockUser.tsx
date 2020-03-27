import React, { useState } from "react";
import { Button } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { Page } from "../../layout";

interface LockUserProps {
  userId?: string;
}

export const LockUser: React.FunctionComponent<LockUserProps> = ({
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
    <Page breadcrumbs={breadcrumbs} title="Benutzer sperren">
      <form id="lock-user-form" onSubmit={handleFormSubmit}>
        <p>Der Benutzer ist momentan nicht gesperrt.</p>
        <Button align="start" loading={loading} type="submit">
          Sperren
        </Button>
      </form>
    </Page>
  );
};
