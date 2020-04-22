import React, { useEffect, useReducer, useState } from "react";
import { InvitationItem } from "./InvitationItem";
import { Loader, Stack } from "../../components";
import { useSocketEvent } from "../../hooks";
import http from "../../HttpClient";
import { Page } from "../../layout";

type AddInvitationAction = { type: "add_invitation"; invitation: any };
type RemoveInvitationAction = { type: "remove_invitation"; invitation: any };
type SetInvitationsAction = { type: "set_invitation"; invitations: any[] };

export type InvitationAction =
  | AddInvitationAction
  | RemoveInvitationAction
  | SetInvitationsAction;

function invitationsReducer(invitations: any[], action: InvitationAction) {
  switch (action.type) {
    case "add_invitation": {
      return [action.invitation, ...invitations];
    }
    case "remove_invitation": {
      return invitations.filter(
        (invitation) => invitation._id !== action.invitation._id
      );
    }
    case "set_invitation": {
      return action.invitations;
    }
  }
}

export const Invitations: React.FunctionComponent = () => {
  const [invitations, dispatch] = useReducer(invitationsReducer, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    http
      .get(`/invitations`)
      .then((invitations: any[]) =>
        dispatch({ type: "set_invitation", invitations })
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useSocketEvent("invitation", (invitation: any) => {
    dispatch({ type: "add_invitation", invitation });
  });

  return (
    <Page title="Einladungen">
      <Loader loading={loading}>
        <Stack className="invitations-list" vertical={true}>
          {invitations.length ? (
            invitations.map((invitation: any) => (
              <InvitationItem
                dispatch={dispatch}
                invitation={invitation}
                key={invitation._id}
              />
            ))
          ) : (
            <span>Du hast keine neuen Einladungen.</span>
          )}
        </Stack>
      </Loader>
    </Page>
  );
};
