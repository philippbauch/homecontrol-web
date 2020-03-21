import React, { useState, useContext } from "react";
import { Level, Input, Button, Breadcrumbs, Breadcrumb } from "../components";
import { client } from "../api/client";
import { useHistory } from "react-router-dom";
import { HomeContext } from "../contexts/HomeContext";

interface AddRoomProps {
  home: any;
}

export const AddRoom: React.FunctionComponent<AddRoomProps> = () => {
  const { home } = useContext(HomeContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

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
    <div id="add-room-page">
      <Breadcrumbs>
        <Breadcrumb link={`/homes/${home._id}`}>{home.name}</Breadcrumb>
        <Breadcrumb link={`/homes/${home._id}/rooms`}>Rooms</Breadcrumb>
      </Breadcrumbs>
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
    </div>
  );
};
