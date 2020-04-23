import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../HttpClient";
import { Button, Checkbox, Input } from "../components";
import { BreadcrumbProps } from "../components/Breadcrumb";
import { useNotify } from "../hooks";
import { Page } from "../layout";

export const AddUser: React.FunctionComponent = () => {
  const history = useHistory();
  const notify = useNotify();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/users`,
      title: "Benutzer",
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    http
      .post(`/users`, { admin: isAdmin, identifier, password })
      .then(() => {
        notify.success("Benutzer erstellt");

        history.push(`/users`);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
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
        <Button kind="primary" loading={loading} type="submit">
          Erstellen
        </Button>
      </form>
    </Page>
  );
};
