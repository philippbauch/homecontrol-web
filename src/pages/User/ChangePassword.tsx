import React, { useState } from "react";
import { Button, Input, Level } from "../../components";

export const ChangePassword: React.FunctionComponent = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Change password");
  };

  return (
    <section id="change-password-section">
      <Level id="change-password-section-header">
        <h3 id="change-password-title">Passwort ändern</h3>
      </Level>
      <form id="change-password-section-form" onSubmit={handleFormSubmit}>
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
        <Button type="submit">Ändern</Button>
      </form>
    </section>
  );
};
