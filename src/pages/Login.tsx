import React, { useState } from "react";
import { Button, Input } from "../components";

export const Login: React.FunctionComponent = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(id, password);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setId(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value);
  };

  return (
    <div id="login-page">
      <section id="login-container">
        <h3 id="login-title">Login</h3>
        <form id="login-form" onSubmit={handleFormSubmit}>
          <Input type="text" value={id} onChange={handleIdChange} />
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" disabled={!id || !password}>
            Login
          </Button>
        </form>
      </section>
    </div>
  );
};
