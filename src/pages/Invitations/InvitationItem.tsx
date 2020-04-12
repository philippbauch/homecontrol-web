import React from "react";
import { Tile, Button } from "../../components";

interface InvitationItemProps {
  invitation: any;
}

export const InvitationItem: React.FunctionComponent<InvitationItemProps> = ({
  invitation,
}) => {
  const acceptInvitation = () => {
    console.log("Accept");
  };

  const denyInvitation = () => {
    console.log("Deny");
  };

  return (
    <Tile className="invitation-item">
      <div className="invitation-info">
        <strong>{invitation.inviter.identifier}</strong> hat dich zu{" "}
        <strong>{invitation.home.name}</strong> eingeladen.
      </div>
      <div className="invitation-actions">
        <Button kind="primary" onClick={acceptInvitation} size="small">
          Annehmen
        </Button>
        <Button onClick={denyInvitation} size="small">
          Ablehnen
        </Button>
      </div>
    </Tile>
  );
};
