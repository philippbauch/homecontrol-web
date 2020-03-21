import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { AddRoom } from "./AddRoom";
import { Level, Breadcrumbs, Breadcrumb } from "../components";
import { HomeContext } from "../contexts/HomeContext";
import { Page } from "../layout";

export const Rooms: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  return (
    <Switch>
      <Route component={AddRoom} path={`/homes/${home._id}/rooms/new`} />
      <Route>
        <Page>
          <Breadcrumbs>
            <Breadcrumb link={`/homes/${home._id}`}>{home.name}</Breadcrumb>
          </Breadcrumbs>
          <Level id="rooms-header">
            <h2 id="add-home-title">Rooms</h2>
            <Link to={`/homes/${home._id}/rooms/new`}>Add</Link>
          </Level>
        </Page>
      </Route>
    </Switch>
  );
};
