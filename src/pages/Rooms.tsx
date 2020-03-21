import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { AddRoom } from "./AddRoom";
import { Level, Breadcrumbs, Breadcrumb } from "../components";
import { HomeContext } from "../contexts/HomeContext";
import { Page } from "../layout";
import { BreadcrumbProps } from "../components/Breadcrumb";

export const Rooms: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/homes/${home._id}`,
      title: home.name as string
    }
  ];

  return (
    <Switch>
      <Route component={AddRoom} path={`/homes/${home._id}/rooms/new`} />
      <Route>
        <Page breadcrumbs={breadcrumbs}>
          <Level id="rooms-header">
            <h2 id="add-home-title">Rooms</h2>
            <Link to={`/homes/${home._id}/rooms/new`}>Add</Link>
          </Level>
        </Page>
      </Route>
    </Switch>
  );
};
