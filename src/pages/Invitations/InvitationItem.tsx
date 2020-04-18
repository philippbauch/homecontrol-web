import React, { Fragment, useCallback, useEffect, useState } from "react";
import { InvitationAction } from "./Invitations";
import { Tile, Button } from "../../components";
import { CheckmarkIcon } from "../../components/icons";
import { useNotify } from "../../contexts/NotificationContext";
import http from "../../HttpClient";

interface InvitationItemProps {
  dispatch: (action: InvitationAction) => void;
  invitation: any;
}

export const InvitationItem: React.FunctionComponent<InvitationItemProps> = ({
  invitation,
  dispatch,
}) => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const handleAccept = () => {
    setLoading(true);

    http
      .put(`/invitations/${invitation._id}`, { accepted: true })
      .then(() => setAccepted(true))
      .catch((error) => {
        console.error(error.message);
        notify.error("Einladung konnte nicht angenommen werden.");
      })
      .finally(() => setLoading(false));
  };

  const handleDeny = () => {
    http
      .put(`/invitations/${invitation._id}`, { accepted: false })
      .then(removeInvitation)
      .catch((error) => {
        console.error(error.message);
        notify.error("Einladung konnte nicht abgelehnt werden.");
      })
      .finally(() => setLoading(false));
  };

  const removeInvitation = useCallback(() => {
    dispatch({ type: "remove_invitation", invitation });
  }, [dispatch, invitation]);

  useEffect(() => {
    console.log("Run effect");
    const timeout = setTimeout(removeInvitation, 30000);

    return () => clearTimeout(timeout);
  }, [invitation, removeInvitation]);

  return (
    <Tile className="invitation-item">
      {accepted ? (
        <span>
          <CheckmarkIcon />
          Einladung wurde angenommen.
        </span>
      ) : (
        <Fragment>
          <div className="invitation-info">
            <strong>{invitation.inviter.identifier}</strong> hat dich zu{" "}
            <strong>{invitation.home.name}</strong> eingeladen.
          </div>
          <div className="invitation-actions">
            <Button
              disabled={loading}
              kind="primary"
              onClick={handleAccept}
              size="small"
            >
              Annehmen
            </Button>
            <Button disabled={loading} onClick={handleDeny} size="small">
              Ablehnen
            </Button>
          </div>
        </Fragment>
      )}
    </Tile>
  );
};
