import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { RoomList } from "./RoomList";
import { AddRoom } from "../AddRoom";
import { client } from "../../api/client";
import { Loader } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Rooms: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  const action = <Link to={`/homes/${home._id}/rooms/new`}>Hinzufügen</Link>;

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/homes/${home._id}`,
      title: home.name as string
    }
  ];

  const fetchRooms = useCallback(async () => {
    setLoading(true);

    try {
      const rooms = await client.get(`/homes/${home._id}/rooms`);

      setRooms(rooms);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [home]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <Switch>
      <Route component={AddRoom} path={`/homes/${home._id}/rooms/new`} />
      <Route>
        <Page action={action} breadcrumbs={breadcrumbs} title="Räume">
          <Loader loading={loading}>
            <RoomList rooms={rooms} />
          </Loader>
        </Page>
      </Route>
    </Switch>
  );
};
