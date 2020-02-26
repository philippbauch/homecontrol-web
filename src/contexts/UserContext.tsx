import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";

interface UserContext {
  error?: string;
  isAuthenticated: boolean;
  user?: any;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

const initialContext: UserContext = {
  isAuthenticated: false,
  onLogin: () => {},
  onLogout: () => {}
};

const UserContext = React.createContext<UserContext>(initialContext);

function decodeToken(token: string): any {
  const decoded = jwt.decode(token) as any;

  if (!decoded.user) {
    throw new Error("Malformed token");
  }

  return decoded.user;
}

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [error, setError] = useState<string>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const onLogin = (token: string) => {
    setError(undefined);

    try {
      const user = decodeToken(token);

      setIsAuthenticated(true);
      setUser(user);

      localStorage.setItem("token", token);
    } catch (error) {
      setError(error.message);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");

    setIsAuthenticated(false);
    setUser(undefined);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const user = decodeToken(token);

        setIsAuthenticated(true);
        setUser(user);
      } catch (error) {
        setError(error.message);

        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        error,
        isAuthenticated,
        onLogin,
        onLogout,
        user
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
