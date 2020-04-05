import React from "react";
import { InvitationItem } from "./InvitationItem";

interface InvitationListProps {
  invitations: any[];
}

export const InvitationList: React.FunctionComponent<InvitationListProps> = ({
  invitations,
}) => {
  return (
    <div className="invitation-list">
      {invitations.length ? (
        invitations.map((invitation) => (
          <InvitationItem invitation={invitation} key={invitation._id} />
        ))
      ) : (
        <span>Du hast keine neuen Einladungen.</span>
      )}
    </div>
  );
};
