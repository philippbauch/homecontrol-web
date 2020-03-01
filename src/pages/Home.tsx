import React from "react";
import { Divider, Level, Tile, Icon } from "../components";

export const Home: React.FunctionComponent = () => {
  return (
    <div id="home-page">
      <div className="overview-header">
        <Level>
          <h1>Übersicht</h1>
        </Level>
        <Divider />
      </div>
      <div className="overview-body">
        <Tile className="overview-tile" dark={true}>
          <Icon icon="fas fa-th-large" size="lg" />
          <span className="overview-tile-title">Räume</span>
        </Tile>
        <Tile className="overview-tile" dark={true}>
          <Icon icon="fas fa-users" size="lg" />
          <span className="overview-tile-title">Bewohner</span>
        </Tile>
        <Tile className="overview-tile" dark={true}>
          <Icon icon="fas fa-envelope-open-text" size="lg" />
          <span className="overview-tile-title">Benachrichtigungen</span>
        </Tile>
        <Tile className="overview-tile" dark={true}>
          <Icon icon="fas fa-random" size="lg" />
          <span className="overview-tile-title">Regeln</span>
        </Tile>
        <Tile className="overview-tile" dark={true}>
          <Icon icon="fas fa-mobile-alt" size="lg" />
          <span className="overview-tile-title">Alle Geräte</span>
        </Tile>
      </div>
    </div>
  );
};
