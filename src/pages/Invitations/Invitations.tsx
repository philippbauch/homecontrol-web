import React, { useEffect, useState } from "react";
import { InvitationList } from "./InvitationList";
import http from "../../HttpClient";
import { Page } from "../../layout";
import { Loader } from "../../components";

export const Invitations: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    setLoading(true);

    http
      .get(`/invitations`)
      .then(setInvitations)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Page title="Einladungen">
      <Loader loading={loading}>
        <InvitationList invitations={invitations} />
      </Loader>
    </Page>
  );
};
