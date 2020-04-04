import React, { useState, useEffect, useReducer } from "react";
import { useUserState } from "./UserContext";
import { Loader } from "../components";
import http from "../HttpClient";

type AddHomeAction = { type: "add_home"; home: any };
type RemoveHomeAction = { type: "remove_home"; homeId: string };
type SetHomesAction = { type: "set_homes"; homes: any[] };
type UpdateHomeAction = { type: "update_home"; homeId: string; update: any };

type Action =
  | AddHomeAction
  | RemoveHomeAction
  | SetHomesAction
  | UpdateHomeAction;

type Dispatch = (action: Action) => void;

const HomesStateContext = React.createContext<any[] | undefined>(undefined);
const HomesDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function homesReducer(homes: any[], action: Action): any {
  switch (action.type) {
    case "add_home": {
      return [...homes, action.home];
    }
    case "remove_home": {
      return homes.filter((home: any) => home._id !== action.homeId);
    }
    case "set_homes": {
      return action.homes;
    }
    case "update_home": {
      return homes.map((home: any) => {
        if (home._id === action.homeId) {
          return {
            ...home,
            ...action.update,
          };
        }

        return home;
      });
    }
  }
}

const HomesProvider: React.FunctionComponent = ({ children }) => {
  const [homes, dispatch] = useReducer(homesReducer, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get("/homes")
      .then((homes) => dispatch({ type: "set_homes", homes }))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <HomesStateContext.Provider value={homes}>
      <HomesDispatchContext.Provider value={dispatch}>
        <Loader loading={loading}>{children}</Loader>
      </HomesDispatchContext.Provider>
    </HomesStateContext.Provider>
  );
};

function useHomesState() {
  const context = React.useContext(HomesStateContext);

  if (context === undefined) {
    throw new Error("useHomesState must be used within a HomesProvider");
  }

  return context;
}

function useHomesDispatch() {
  const context = React.useContext(HomesDispatchContext);

  if (context === undefined) {
    throw new Error("useHomesDispatch must be used within a HomesProvider");
  }

  return context;
}

function useHome() {
  const homes = useHomesState();
  const user = useUserState();

  if (!user) {
    return null;
  }

  return homes.find((home: any) => home._id === user.preferences?.activeHomeId);
}

export { HomesProvider, useHome, useHomesDispatch, useHomesState };
