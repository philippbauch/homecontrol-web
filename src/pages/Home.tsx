import React, { useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { Redirect } from "react-router-dom";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  return home ? (
    <div id="home-page">
      <h2 id="homes-title">{home.name}</h2>
    </div>
  ) : (
    <Redirect to="/homes" />
  );
};
