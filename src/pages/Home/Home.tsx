import React, { useContext } from "react";
import { HomeContext } from "../../contexts/HomeContext";
import { Redirect, Link, useHistory, Switch, Route } from "react-router-dom";
import { Level, Tile, ColorSquare, Divider } from "../../components";
import { Rooms } from "../Rooms";

export const Home: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);
  const history = useHistory();

  return home ? (
    <Switch>
      <Route component={Rooms} path={`/homes/${home._id}/rooms`} />
      <Route>
        <div id="home-page">
          <Level id="home-header">
            <h2 id="home-title">{home.name}</h2>
            <Link to={`/homes/${home._id}/edit`}>Edit</Link>
          </Level>

          <section id="home-menu">
            <Tile
              className="home-menu-item"
              onClick={() => history.push(`/homes/${home._id}/rooms`)}
            >
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
        </div>
      </Route>
    </Switch>
  ) : (
    <Redirect to="/homes" />
  );
};
