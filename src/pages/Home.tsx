import React, { useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { Redirect, Link } from "react-router-dom";
import { Level, Tile } from "../components";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  return home ? (
    <div id="home-page">
      <Level id="home-header">
        <h2 id="home-title">{home.name}</h2>
        <Link to={`/homes/${home._id}/edit`}>Edit</Link>
      </Level>

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
