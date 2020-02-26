import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";

interface UserContext {
  token: string | null;
  user: any | null;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

const initialContext: UserContext = {
  token: null,
  user: null,
  onLogin: () => {},
  onLogout: () => {}
};

const UserContext = React.createContext<UserContext>(initialContext);

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const handleLogin = (token: string) => {
    const user = jwt.decode(token);
    setUser(user);
    setToken(token);

    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwt.decode(token);

      setUser(decoded);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        onLogin: handleLogin,
        onLogout: handleLogout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
