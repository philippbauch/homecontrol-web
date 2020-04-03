import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Input } from "../components";
import { useLogin, useUserState } from "../contexts/UserContext";
import { useDefaultRoute } from "../hooks";
import http from "../HttpClient";

export const Login: React.FunctionComponent = () => {
  const defaultRoute = useDefaultRoute();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = useLogin();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const user = useUserState();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const credentials = {
      identifier,
      password
    };

    http
      .post("/login", credentials)
      .then(login)
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) {
      history.push(defaultRoute);
    }
  }, [defaultRoute, history, user]);

  return (
    <div id="login-page">
      <section id="login-container">
        <h2 id="login-title">Login</h2>
        <form id="login-form" onSubmit={handleFormSubmit}>
          {error ? <Alert>{error}</Alert> : null}
          <div className="login-form-section">
            <label className="login-form-label">Nutzername</label>

            <Input
              onChange={setIdentifier}
              placeholder="ID"
              type="text"
              value={identifier}
            />
          </div>

          <div className="login-form-section">
            <label className="login-form-label">Passwort</label>

            <Input
              onChange={setPassword}
              placeholder="Password"
              type="password"
              value={password}
            />
          </div>

          <Button loading={loading} type="submit">
            Anmelden
          </Button>
        </form>
      </section>
    </div>
  );
};
