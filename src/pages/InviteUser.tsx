import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../HttpClient";
import { Button, Input } from "../components";
import { useHome } from "../contexts/HomesContext";
import { Page } from "../layout";
import { BreadcrumbProps } from "../components/Breadcrumb";

export const InviteUser: React.FunctionComponent = () => {
  const home = useHome();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [inviteeIdentifier, setInviteeIdentifier] = useState("");

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/homes/${home._id}`,
      title: home.name as string,
    },
    {
      link: `/homes/${home._id}/residents`,
      title: "Bewohner",
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    http
      .post("/invitations", { homeId: home._id, inviteeIdentifier })
      .then(() => history.push(`/homes/${home._id}/residents`))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <Page breadcrumbs={breadcrumbs} title="Benutzer einladen">
      <form id="invite-user-form" onSubmit={handleFormSubmit}>
        <div className="invite-user-form-section">
          <label className="invite-user-form-label">Nutzername</label>
          <Input
            onChange={setInviteeIdentifier}
            placeholder="Nutzername"
            type="text"
            value={inviteeIdentifier}
          />
        </div>
        <Button kind="primary" loading={loading} type="submit">
          Einladen
        </Button>
      </form>
    </Page>
  );
};
