import React, { useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { Redirect, Link } from "react-router-dom";
import { Level, Tile, ColorSquare } from "../components";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  return home ? (
    <div id="home-page">
      <Level id="home-header">
        <h2 id="home-title">{home.name}</h2>
        <Link to={`/homes/${home._id}/edit`}>Edit</Link>
      </Level>

      <section id="home-menu">
        <Tile className="home-menu-item">
          <ColorSquare color="blue" />
          <span>Rooms</span>
        </Tile>
        <Tile className="home-menu-item">
          <ColorSquare color="purple" />
          <span>Devices</span>
        </Tile>
        <Tile className="home-menu-item">
          <ColorSquare color="green" />
          <span>Residents</span>
        </Tile>
      </section>
    </div>
  ) : (
    <Redirect to="/homes" />
  );
};
