import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../api/client";
import { Button, Input, Level } from "../components";
import { HomeContext } from "../contexts/HomeContext";
import { Page } from "../layout";
import { BreadcrumbProps } from "../components/Breadcrumb";

interface AddRoomProps {
  home: any;
}

export const AddRoom: React.FunctionComponent<AddRoomProps> = () => {
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

    try {
      const room = await client.post(`/homes/${home._id}/rooms`, { name });

      console.log(room);

      setLoading(false);

      history.push(`/homes/${home._id}/rooms`);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setName(value);
  };

  return (
    <Page breadcrumbs={breadcrumbs}>
      <Level id="add-room-header">
        <h2 id="add-room-title">Add new room</h2>
      </Level>
      <form id="add-room-form" onSubmit={handleFormSubmit}>
        <div className="add-room-form-section">
          <label className="add-room-form-label">Name</label>
          <Input
            onChange={handleNameChange}
            placeholder="Name"
            type="text"
            value={name}
          />
        </div>
        <Button loading={loading} type="submit">
          Add
        </Button>
      </form>
    </Page>
  );
};
