import React from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { AddRoom } from "../AddRoom";
import { InviteUser } from "../InviteUser";
import { Residents } from "../Residents";
import { Rooms } from "../Rooms";
import { Divider, Level, Tile } from "../../components";
import { PeopleIcon, RoomsIcon } from "../../components/icons";
import { useHome } from "../../contexts/HomesContext";
import { Page } from "../../layout";

export const Home: React.FunctionComponent = () => {
  const history = useHistory();
  const home = useHome();

  const extra = <Link to={`/homes/${home._id}/edit`}>Bearbeiten</Link>;

  const goToResidents = () => {
    history.push(`/homes/${home._id}/residents`);
  };

  const goToRooms = () => {
    history.push(`/homes/${home._id}/rooms`);
  };

  return home ? (
    <Switch>
      <Route component={InviteUser} path={`/homes/:homeId/invite`} />
      <Route component={Residents} path={`/homes/:homeId/residents`} />
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
            <Tile className="home-menu-item" onClick={goToResidents}>
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
