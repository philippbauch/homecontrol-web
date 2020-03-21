import React, { useState, useContext } from "react";
import { Level, Input, Button, Breadcrumbs, Breadcrumb } from "../components";
import { client } from "../api/client";
import { useHistory } from "react-router-dom";
import { HomeContext } from "../contexts/HomeContext";

interface AddHomeProps {
  home: any;
}

export const AddHome: React.FunctionComponent<AddHomeProps> = () => {
  const { addHome } = useContext(HomeContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const home = await client.post("/homes", { name });

      addHome(home);
      setLoading(false);

      history.push("/homes");
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setName(value);
  };

  return (
    <div id="add-home-page">
      <Breadcrumbs>
        <Breadcrumb link="/homes">Homes</Breadcrumb>
      </Breadcrumbs>
      <Level id="add-home-header">
        <h2 id="add-home-title">Add new home</h2>
      </Level>
      <form id="add-home-form" onSubmit={handleFormSubmit}>
        <div className="add-home-form-section">
          <label className="add-home-form-label">Name</label>

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
