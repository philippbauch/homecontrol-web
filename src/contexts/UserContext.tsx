import { ObjectId } from "bson";
import moment from "moment";
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
  const [userState, dispatchUser] = useReducer(userReducer, null);
  const [loading, setLoading] = useState(true);

  const mapUser = (user: any) => {
    const _id = ObjectId.createFromHexString(user._id);
    const lastLogin = moment(user.lastLogin);

    return { ...user, _id, lastLogin };
  };

  useEffect(() => {
    http
      .get("/identity")
      .then(mapUser)
      .then((user) => dispatchUser({ type: "set_user", user }))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserStateContext.Provider value={userState}>
      <UserDispatchContext.Provider value={dispatchUser}>
        <Loader loading={loading}>{children}</Loader>
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

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

export { UserProvider, useUserState, useUserDispatch };
