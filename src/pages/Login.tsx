import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Translate, Alert } from "../components";
import { UserContext } from "../contexts/UserContext";
import { client } from "../api/client";

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

      onLogin(token);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
      history.push("/home");
    }
  }, [history, user]);

  return (
    <div id="login-page">
      <section id="login-container">
        <h3 id="login-title">Login</h3>
        <form id="login-form" onSubmit={handleFormSubmit}>
          {error ? (
            <Alert>
              <Translate>{error}</Translate>
            </Alert>
          ) : null}
          <Input
            onChange={handleIdentifierChange}
            placeholder="ID"
            type="text"
            value={identifier}
          />
          <Input
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
            value={password}
          />
          <Button
            disabled={!identifier || !password}
            loading={loading}
            type="submit"
          >
            Login
          </Button>
        </form>
      </section>
    </div>
  );
};
