import React from "react";
import { Tile } from "../../components";

interface InvitationItemProps {
  invitation: any;
}

export const InvitationItem: React.FunctionComponent<InvitationItemProps> = ({
  invitation,
}) => {
  //   const acceptInvitation = () => {
  //     console.log("Accept");
  //   };

  //   const denyInvitation = () => {
  //     console.log("Deny");
  //   };

  return (
    <Tile className="invitation-item">
      <div className="invitation-info">
        <span className="invitation-name">
          <b>{invitation.inviter.identifier}</b> hat dich zu{" "}
          <b>{invitation.home.name}</b> eingeladen.
        </span>
      </div>
    </Tile>
  );
};
