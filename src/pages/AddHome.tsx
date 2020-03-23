import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { client } from "../api/client";
import { Button, Input } from "../components";
import { HomeContext } from "../contexts/HomeContext";
import { Page } from "../layout";
import { BreadcrumbProps } from "../components/Breadcrumb";

export const AddHome: React.FunctionComponent = () => {
  const { addHome } = useContext(HomeContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/homes",
      title: "Homes"
    }
  ];

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
    <Page breadcrumbs={breadcrumbs} title="Zuhause hinzufügen">
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
          Hinzufügen
        </Button>
      </form>
    </Page>
  );
};
