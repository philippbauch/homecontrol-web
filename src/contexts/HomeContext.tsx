import React, { useState, useEffect, useContext, useCallback } from "react";
import { client } from "../api/client";
import { Loader } from "../components";
import { UserContext } from "./UserContext";

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
  const { user } = useContext(UserContext);
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

  const fetchHomes = async () => {
    setLoading(true);

    try {
      const homes = await client.get("/homes");

      setHomes(homes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getSelectedHome = () => {
    return homes.find((home: any) => home._id === activeHomeId);
  };

  const setHome = useCallback(async (home: any) => {
    setActiveHomeId(home._id);

    try {
      await client.put("/preferences", { activeHomeId: home._id });
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchHomes();
  }, []);

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
