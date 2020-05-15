import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Input } from "../components";
import { useUserState } from "../contexts/UserContext";
import { useError, useLogin } from "../hooks";
import http from "../HttpClient";

export const Login: React.FunctionComponent = () => {
  const [error, setError, resetError] = useError();
  const history = useHistory();
  const login = useLogin();
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const user = useUserState();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const credentials = {
      identifier,
      password,
    };

    http
      .post("/login", credentials)
      .then(login)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) {
      history.push("/courses");
    }
  }, [history, user]);

  return (
    <div id="login-page">
      <section id="login-container">
        <h1 id="login-title">Login</h1>
        <form id="login-form" onSubmit={handleFormSubmit}>
          {error ? (
            <Alert onClose={resetError} type="error">
              {error}
            </Alert>
          ) : null}
          <div className="login-form-section">
            <label className="login-form-label">E-Mail</label>
            <Input
              onChange={setIdentifier}
              placeholder="E-Mail"
              type="text"
              value={identifier}
            />
          </div>
          <div className="login-form-section">
            <label className="login-form-label">Passwort</label>
            <Input
              onChange={setPassword}
              placeholder="Passwort"
              type="password"
              value={password}
            />
          </div>
          <Button big={true} kind="primary" loading={loading} type="submit">
            Anmelden
          </Button>
        </form>
      </section>
    </div>
  );
};
