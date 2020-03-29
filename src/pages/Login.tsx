import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../api/client";
import { Alert, Button, Input } from "../components";
import { UserContext } from "../contexts/UserContext";

export const Login: React.FunctionComponent = () => {
  const { defaultRoute, onLogin, user } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials = {
      identifier,
      password
    };

    setLoading(true);

    try {
      const { token } = await client.post("/login", credentials);

      setLoading(false);
      onLogin(token);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
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
