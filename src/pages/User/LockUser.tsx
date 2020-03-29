import React, { useState } from "react";
import { client } from "../../api/client";
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

    try {
      const { locked } = await client.put(`/users/${user._id}/locked`, {
        locked: !user.locked
      });

      user.locked = locked;

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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
