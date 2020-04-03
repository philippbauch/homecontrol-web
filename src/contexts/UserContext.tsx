import React, { useEffect, useReducer, useState } from "react";
import { Loader } from "../components";
import http from "../HttpClient";

type ResetUserAction = { type: "reset_user" };
type SetUserAction = { type: "set_user"; user: any };
type UpdateUserAction = { type: "update_user"; update: any };

type Action = ResetUserAction | SetUserAction | UpdateUserAction;

type Dispatch = (action: Action) => void;

const UserStateContext = React.createContext<any | undefined>(undefined);
const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function userReducer(user: any, action: Action): any {
  switch (action.type) {
    case "reset_user": {
      return null;
    }
    case "set_user": {
      return action.user;
    }
    case "update_user": {
      return { ...user, ...action.update };
    }
  }
}

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get("/identity")
      .then(user => dispatchUser({ type: "set_user", user }))
      .catch(() => dispatchUser({ type: "reset_user" }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatchUser}>
        <Loader loading={loading}>{children}</Loader>
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

function useLogin() {
  const dispatch = useUserDispatch();

  const login = async (user: any) => {
    dispatch({ type: "set_user", user });
  };

  return login;
}

function useLogout() {
  const dispatch = useUserDispatch();

  const logout = () => {
    dispatch({ type: "reset_user" });
  };

  return logout;
}

function useUserState() {
  const context = React.useContext(UserStateContext);

  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }

  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);

  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }

  return context;
}

export { useLogin, useLogout, UserProvider, useUserState, useUserDispatch };
