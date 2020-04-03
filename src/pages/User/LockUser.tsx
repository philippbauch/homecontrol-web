import React, { useState } from "react";
import http from "../../HttpClient";
import { Button } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { Page } from "../../layout";

interface LockUserProps {
  user: any;
}

export const LockUser: React.FunctionComponent<LockUserProps> = ({ user }) => {
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

    http
      .put(`/users/${user._id}/locked`, {
        locked: !user.locked
      })
      .then(({ locked }) => {
        user.locked = locked;
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Benutzer sperren">
      <form id="lock-user-form" onSubmit={handleFormSubmit}>
        {user.locked ? (
          <p>Der Benutzer ist momentan gesperrt.</p>
        ) : (
          <p>Der Benutzer ist momentan nicht gesperrt.</p>
        )}
        <Button align="start" loading={loading} type="submit">
          {user.locked ? "Entsperren" : "Sperren"}
        </Button>
      </form>
    </Page>
  );
};
