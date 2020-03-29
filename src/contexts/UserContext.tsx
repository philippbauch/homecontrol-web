import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import { client } from "../api/client";
import { Loader } from "../components";

interface UserContext {
  defaultRoute: string;
  user?: any;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

const initialContext: UserContext = {
  defaultRoute: "/homes",
  onLogin: () => {},
  onLogout: () => {}
};

const UserContext = React.createContext<UserContext>(initialContext);

function decodeToken(token: string): any {
  const { _id } = jwt.decode(token) as any;

  if (!_id) {
    throw new Error("Malformed token");
  }

  return _id;
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

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  return localStorage.removeItem("token");
}

function storeToken(token: string) {
  return localStorage.setItem("token", token);
}

function isTokenPresent() {
  return !!getToken();
}

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(isTokenPresent());
  const [user, setUser] = useState<any>(findUser());

  const fetchUser = async () => {
    setLoading(true);

    try {
      const user = await client.get("/identity");
      setUser(user);
      setLoading(false);
    } catch (error) {
      if (
        error.message === "ERR_INVALID_TOKEN" ||
        error.message === "ERR_LOCKED_USER"
      ) {
        removeToken();
        setUser(null);
      }
      setLoading(false);
    }
  };

  const getDefaultRoute = () => {
    const { activeHomeId } = user?.preferences || {};

    return activeHomeId ? `/homes/${activeHomeId}` : "/homes";
  };

  const onLogin = (token: string) => {
    storeToken(token);
    fetchUser();
  };

  const onLogout = () => {
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        defaultRoute: getDefaultRoute(),
        onLogin,
        onLogout,
        user
      }}
    >
      <Loader loading={loading}>{children}</Loader>
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
