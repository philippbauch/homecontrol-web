import React, { useContext } from "react";
import { Redirect, Link, useHistory, Switch, Route } from "react-router-dom";
import { AddRoom } from "../AddRoom";
import { Rooms } from "../Rooms";
import { Divider, Level, Tile } from "../../components";
import { PeopleIcon, RoomsIcon } from "../../components/icons";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);
  const history = useHistory();

  const extra = <Link to={`/homes/${home._id}/edit`}>Bearbeiten</Link>;

  const goToRooms = () => {
    history.push(`/homes/${home._id}/rooms`);
  };

  return home ? (
    <Switch>
      <Route component={Rooms} exact={true} path={`/homes/:homeId/rooms`} />
      <Route component={AddRoom} path={`/homes/:homeId/rooms/new`} />
      <Route>
        <Page extra={extra} title={home.name}>
          <section id="home-menu">
            <Tile className="home-menu-item" onClick={goToRooms}>
              <RoomsIcon />
              <span>Räume</span>
            </Tile>
            <Tile className="home-menu-item">
              <span>Geräte</span>
            </Tile>
            <Tile className="home-menu-item">
              <PeopleIcon />
              <span>Bewohner</span>
            </Tile>
          </section>
          <Divider />
          <section id="home-activity">
            <Level id="home-activity-header">
              <h3 id="home-activity-title">Aktivitäten</h3>
              <Link to={`/homes/${home._id}/activity`}>Alle anzeigen</Link>
            </Level>
            <div>Keine neuen Aktivitäten.</div>
          </section>
        </Page>
      </Route>
    </Switch>
  ) : (
    <Redirect to="/homes" />
  );
};
