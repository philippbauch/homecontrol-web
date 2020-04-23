import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../HttpClient";
import { Button, Input } from "../components";
import { useHome } from "../contexts/HomesContext";
import { useNotify } from "../hooks";
import { Page } from "../layout";
import { BreadcrumbProps } from "../components/Breadcrumb";

export const AddRoom: React.FunctionComponent = () => {
  const home = useHome();
  const history = useHistory();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/homes/${home._id}`,
      title: home.name as string,
    },
    {
      link: `/homes/${home._id}/rooms`,
      title: "Rooms",
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    http
      .post(`/homes/${home._id}/rooms`, { name })
      .then(() => {
        notify.success("Raum erstellt");
        history.push(`/homes/${home._id}/rooms`);
      })
      .catch((error) => console.error(error))
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
        <Button kind="primary" loading={loading} type="submit">
          Hinzufügen
        </Button>
      </form>
    </Page>
  );
};
