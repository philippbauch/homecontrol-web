import React, { useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { Redirect } from "react-router-dom";
import { Tile } from "../components";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  return home ? (
    <div id="home-page">
      <h2 id="home-title">{home.name}</h2>
      <section id="home-menu">
        <Tile>Residents</Tile>
        <Tile>Rooms</Tile>
        <Tile>Devices</Tile>
        <Tile>Invitations</Tile>
      </section>
    </div>
  ) : (
    <Redirect to="/homes" />
  );
};
