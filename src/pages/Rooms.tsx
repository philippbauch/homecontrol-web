import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { AddRoom } from "./AddRoom";
import { BreadcrumbProps } from "../components/Breadcrumb";
import { HomeContext } from "../contexts/HomeContext";
import { Page } from "../layout";

export const Rooms: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);

  const action = <Link to={`/homes/${home._id}/rooms/new`}>Add</Link>;

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
        <Page action={action} breadcrumbs={breadcrumbs} title="Rooms"></Page>
      </Route>
    </Switch>
  );
};
