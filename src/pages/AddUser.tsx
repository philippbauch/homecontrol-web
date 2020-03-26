import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../api/client";
import { Button, Checkbox, Input } from "../components";
import { BreadcrumbProps } from "../components/Breadcrumb";
import { Page } from "../layout";

export const AddUser: React.FunctionComponent = () => {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
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
      await client.post(`/users`, { identifier, password });
      setLoading(false);
      history.push(`/users`);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Benutzer erstellen">
      <form id="add-user-form" onSubmit={handleFormSubmit}>
        <div className="add-user-form-section">
          <label className="add-user-form-label">Nutzername</label>
          <Input
            onChange={setIdentifier}
            placeholder="Name"
            type="text"
            value={identifier}
          />
        </div>
        <div className="add-user-form-section">
          <label className="add-user-form-label">Passwort</label>
          <Input
            onChange={setPassword}
            placeholder="Passwort"
            type="password"
            value={password}
          />
        </div>
        <div className="add-user-form-section">
          <Checkbox checked={isAdmin} onChange={setIsAdmin}>
            Administrator
          </Checkbox>
        </div>
        <Button loading={loading} type="submit">
          Erstellen
        </Button>
      </form>
    </Page>
  );
};
