import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "../components";
import { BreadcrumbProps } from "../components/Breadcrumb";
import { useHomesDispatch } from "../contexts/HomesContext";
import { useNotify } from "../hooks";
import http from "../HttpClient";
import { Page } from "../layout";

export const AddHome: React.FunctionComponent = () => {
  const dispatch = useHomesDispatch();
  const history = useHistory();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/homes",
      title: "Homes",
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    http
      .post("/homes", { name })
      .then((home) => {
        dispatch({ type: "add_home", home });
        notify.success("Zuhause erstellt");

        history.push("/homes");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Zuhause hinzufügen">
      <form id="add-home-form" onSubmit={handleFormSubmit}>
        <div className="add-home-form-section">
          <label className="add-home-form-label">Name</label>
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
