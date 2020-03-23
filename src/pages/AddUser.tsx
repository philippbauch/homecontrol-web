import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../api/client";
import { Button, Input } from "../components";
import { BreadcrumbProps } from "../components/Breadcrumb";
import { Page } from "../layout";

export const AddUser: React.FunctionComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/users`,
      title: "Benutzer"
    }
  ];

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const user = await client.post(`/users`, { identifier, password });

      console.log(user);

      setLoading(false);

      history.push(`/users`);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleIdentifierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setIdentifier(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value);
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Benutzer erstellen">
      <form id="add-user-form" onSubmit={handleFormSubmit}>
        <div className="add-user-form-section">
          <label className="add-user-form-label">Nutzername</label>
          <Input
            onChange={handleIdentifierChange}
            placeholder="Name"
            type="text"
            value={identifier}
          />
        </div>
        <div className="add-user-form-section">
          <label className="add-user-form-label">Passwort</label>
          <Input
            onChange={handlePasswordChange}
            placeholder="Passwort"
            type="password"
            value={password}
          />
        </div>
        <Button loading={loading} type="submit">
          Hinzufügen
        </Button>
      </form>
    </Page>
  );
};
