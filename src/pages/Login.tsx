import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../api/client";
import { Alert, Button, Input, Translate } from "../components";
import { UserContext } from "../contexts/UserContext";

export const Login: React.FunctionComponent = () => {
  const { user, onLogin } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [identifier, setIdentifier] = useState("");
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

  useEffect(() => {
    if (user) {
      if (user.preferences.activeHomeId) {
        history.push(`/homes/${user.preferences.activeHomeId}`);
      } else {
        history.push("/homes");
      }
    }
  }, [history, user]);

  return (
    <div id="login-page">
      <section id="login-container">
        <h1 id="login-title">Login</h1>
        <form id="login-form" onSubmit={handleFormSubmit}>
          {error ? (
            <Alert>
              <Translate>{error}</Translate>
            </Alert>
          ) : null}
          <div className="login-form-section">
            <label className="login-form-label">Nutzername</label>

            <Input
              onChange={handleIdentifierChange}
              placeholder="ID"
              type="text"
              value={identifier}
            />
          </div>

          <div className="login-form-section">
            <label className="login-form-label">Passwort</label>

            <Input
              onChange={handlePasswordChange}
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
