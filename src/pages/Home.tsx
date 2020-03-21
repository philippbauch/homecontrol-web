import React, { useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  return (
    <div id="home-page">
      <h2 id="homes-title">{home.name}</h2>
    </div>
  );
};
