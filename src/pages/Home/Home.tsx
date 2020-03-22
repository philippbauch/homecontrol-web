import React, { useContext } from "react";
import { Redirect, Link, useHistory, Switch, Route } from "react-router-dom";
import { Rooms } from "../Rooms";
import { Level, Tile, ColorSquare, Divider } from "../../components";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);
  const history = useHistory();

  const action = <Link to={`/homes/${home._id}/edit`}>Edit</Link>;

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
          <Divider />
          <section id="home-activity">
            <Level id="home-activity-header">
              <h3 id="home-activity-title">Activity</h3>
              <Link to={`/homes/${home._id}/activity`}>Show all</Link>
            </Level>
            <div>No recent activities.</div>
          </section>
        </Page>
      </Route>
    </Switch>
  ) : (
    <Redirect to="/homes" />
  );
};
