import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoomList } from "./RoomList";
import { client } from "../../api/client";
import { Loader } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Rooms: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  const extra = <Link to={`/homes/${home._id}/rooms/new`}>Hinzufügen</Link>;

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
    <Page extra={extra} breadcrumbs={breadcrumbs} title="Räume">
      <Loader loading={loading}>
        <RoomList rooms={rooms} />
      </Loader>
    </Page>
  );
};
