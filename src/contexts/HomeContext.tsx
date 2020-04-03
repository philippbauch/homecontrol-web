import React, { useState, useEffect, useCallback } from "react";
import http from "../HttpClient";
import { Loader } from "../components";
import { useUserState } from "./UserContext";

interface HomeContext {
  addHome: (home: any) => void;
  home: any;
  homes: any;
  loading: boolean;
  setHome: (home: any) => void;
}

const initialContext: HomeContext = {
  addHome: () => {},
  home: null,
  homes: [],
  loading: false,
  setHome: () => {}
};

const HomeContext = React.createContext<HomeContext>(initialContext);

const HomeProvider: React.FunctionComponent = ({ children }) => {
  const user = useUserState();
  const [homes, setHomes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeHomeId, setActiveHomeId] = useState<number>(
    user.preferences.activeHomeId
  );

  const addHome = useCallback(
    (home: any) => {
      setHomes([...homes, home]);
    },
    [homes]
  );

  const fetchHomes = () => {
    setLoading(true);

    http
      .get("/homes")
      .then(setHomes)
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSelectedHome = () => {
    return homes.find((home: any) => home._id === activeHomeId);
  };

  const setHome = useCallback(
    (home: any) => {
      setActiveHomeId(home._id);

      http.put(`/users/${user._id}`, {
        preferences: { activeHomeId: home._id }
      });
    },
    [user._id]
  );

  useEffect(fetchHomes, []);

  return (
    <HomeContext.Provider
      value={{
        addHome,
        homes,
        home: getSelectedHome(),
        loading,
        setHome
      }}
    >
      <Loader loading={loading}>{children}</Loader>
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };
