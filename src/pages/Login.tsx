import React, { useState } from "react";
import { Button, Input } from "../components";
import { RouteComponentProps, withRouter } from "react-router-dom";

const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push("/home");
    }, 2000);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setId(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value);
  };

  const isLoginDisabled = !id || !password;

  return (
    <div id="login-page">
      <section id="login-container">
        <h3 id="login-title">Login</h3>
        <form id="login-form" onSubmit={handleFormSubmit}>
          <Input
            onChange={handleIdChange}
            placeholder="ID"
            type="text"
            value={id}
          />
          <Input
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
            value={password}
          />
          <Button disabled={isLoginDisabled} loading={loading} type="submit">
            Login
          </Button>
        </form>
      </section>
    </div>
  );
};

export default withRouter(Login);
