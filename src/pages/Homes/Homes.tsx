import React, { useContext } from "react";
import { HomeList } from "./HomeList";
import { HomeContext } from "../../contexts/HomeContext";

export const Homes: React.FunctionComponent = () => {
  const { homes } = useContext(HomeContext);

  return (
    <div id="homes-page">
      <h2 id="homes-title">Select your home</h2>
      <HomeList homes={homes} />
    </div>
  );
};
