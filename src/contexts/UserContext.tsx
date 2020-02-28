import jwt from "jsonwebtoken";
import React, { useState } from "react";

interface UserContext {
  user?: any;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

const initialContext: UserContext = {
  onLogin: () => {},
  onLogout: () => {}
};

const UserContext = React.createContext<UserContext>(initialContext);

function decodeToken(token: string): any {
  const { user } = jwt.decode(token) as any;

  if (!user) {
    throw new Error("Malformed token");
  }

  return user;
}

function findUser(): any | null {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      return decodeToken(token);
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  return null;
}

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<any>(findUser());

  const onLogin = (token: string) => {
    const user = decodeToken(token);
    setUser(user);

    localStorage.setItem("token", token);
  };

  const onLogout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
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
