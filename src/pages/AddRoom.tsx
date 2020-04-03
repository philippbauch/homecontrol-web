import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import http from "../HttpClient";
import { Button, Input } from "../components";
import { HomeContext } from "../contexts/HomeContext";
import { Page } from "../layout";
import { BreadcrumbProps } from "../components/Breadcrumb";

export const AddRoom: React.FunctionComponent = () => {
  const { home } = useContext(HomeContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/homes/${home._id}`,
      title: home.name as string
    },
    {
      link: `/homes/${home._id}/rooms`,
      title: "Rooms"
    }
  ];

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    http
      .post(`/homes/${home._id}/rooms`, { name })
      .then(room => {
        console.log(room);

        history.push(`/homes/${home._id}/rooms`);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Raum hinzufügen">
      <form id="add-room-form" onSubmit={handleFormSubmit}>
        <div className="add-room-form-section">
          <label className="add-room-form-label">Name</label>
          <Input
            onChange={setName}
            placeholder="Name"
            type="text"
            value={name}
          />
        </div>
        <Button loading={loading} type="submit">
          Hinzufügen
        </Button>
      </form>
    </Page>
  );
};
