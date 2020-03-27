import React, { useState } from "react";
import { Button, Input } from "../../components";
import { Page } from "../../layout";
import { BreadcrumbProps } from "../../components/Breadcrumb";

interface ChangePasswordProps {
  userId?: string;
}

export const ChangePassword: React.FunctionComponent<ChangePasswordProps> = ({
  userId
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [oldPassword, setOldPassword] = useState("");

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

    console.log("Change password");
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
        <Button align="start" type="submit">
          Ändern
        </Button>
      </form>
    </Page>
  );
};
