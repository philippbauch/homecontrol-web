import React, { useState } from "react";
import { Button, Input } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import http from "../../HttpClient";
import { Page } from "../../layout";

interface ChangePasswordProps {
  user: any;
}

export const ChangePassword: React.FunctionComponent<ChangePasswordProps> = ({
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [oldPassword, setOldPassword] = useState("");

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
      .put(`/users/${user._id}`, {
        currentPassword: oldPassword,
        password: newPassword,
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Passwort ändern">
      <form id="change-password-form" onSubmit={handleFormSubmit}>
        <div className="change-password-form-section">
          <label className="change-password-form-label">
            Aktuelles Passwort
          </label>
          <Input
            onChange={setOldPassword}
            placeholder="Aktuelles Passwort"
            type="password"
            value={oldPassword}
          />
        </div>
        <div className="change-password-form-section">
          <label className="change-password-form-label">Neues Passwort</label>
          <Input
            onChange={setNewPassword}
            placeholder="Neues Passwort"
            type="password"
            value={newPassword}
          />
        </div>
        <div className="change-password-form-section">
          <label className="change-password-form-label">
            Neues Passwort wiederholen
          </label>
          <Input
            onChange={setNewPasswordRepeat}
            placeholder="Passwort wiederholen"
            type="password"
            value={newPasswordRepeat}
          />
        </div>
        <Button align="start" kind="primary" loading={loading} type="submit">
          Ändern
        </Button>
      </form>
    </Page>
  );
};
