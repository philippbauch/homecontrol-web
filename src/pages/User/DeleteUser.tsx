import React, { useState } from "react";
import { Button, Level } from "../../components";

interface DeleteUserProps {
  user: any;
}

export const DeleteUser: React.FunctionComponent<DeleteUserProps> = ({
  user
}) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    console.log("Delete user");
  };

  return (
    <section id="delete-user-section">
      <Level id="delete-user-section-header">
        <h3 id="delete-user-title">Account löschen</h3>
      </Level>
      <form id="delete-user-section-form" onSubmit={handleFormSubmit}>
        <p>Diese Aktion kann nicht rückgängig gemacht werden.</p>
        <Button align="start" kind="danger" loading={loading} type="submit">
          Löschen
        </Button>
      </form>
    </section>
  );
};
