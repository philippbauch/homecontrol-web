import React, { useContext } from "react";
import { Redirect, Link, useHistory, Switch, Route } from "react-router-dom";
import { Rooms } from "../Rooms";
import { Divider, Level, Tile } from "../../components";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);
  const history = useHistory();

  const action = <Link to={`/homes/${home._id}/edit`}>Bearbeiten</Link>;

  const goToRooms = () => {
    history.push(`/homes/${home._id}/rooms`);
  };

  return home ? (
    <Switch>
      <Route component={Rooms} path={`/homes/${home._id}/rooms`} />
      <Route>
        <Page action={action} title={home.name}>
          <section id="home-menu">
            <Tile className="home-menu-item" onClick={goToRooms}>
              <span>Räume</span>
            </Tile>
            <Tile className="home-menu-item">
              <span>Geräte</span>
            </Tile>
            <Tile className="home-menu-item">
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
