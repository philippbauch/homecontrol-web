import anime from "animejs";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { InvitationAction } from "./Invitations";
import { Tile, Button, Stack } from "../../components";
import { CheckmarkIcon } from "../../components/icons";
import { useNotify } from "../../contexts/NotificationContext";
import http from "../../HttpClient";
import { getObjectIdTime } from "../../utils";

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
  const elementRef = useRef<HTMLDivElement>(null);

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

  const dismiss = useCallback(() => {
    const element = elementRef.current;

    anime({
      complete: removeInvitation,
      duration: 200,
      easing: "easeInOutCubic",
      opacity: [1, 0],
      targets: element,
    });
  }, [removeInvitation]);

  useEffect(() => {
    if (!accepted) {
      return;
    }

    const timeout = setTimeout(dismiss, 3000);

    return () => clearTimeout(timeout);
  }, [accepted, dismiss]);

  return (
    <Tile className="invitation-item" ref={elementRef}>
      {accepted ? (
        <Stack align="center" className="invitation-accepted">
          <CheckmarkIcon />
          <span>Einladung wurde angenommen.</span>
        </Stack>
      ) : (
        <Fragment>
          <Stack className="invitation-info" gap={false} vertical={true}>
            <span className="invitation-date">
              {getObjectIdTime(invitation._id, "DD.MM.YY HH:MM")}
            </span>
            <span className="invitation-text">
              <strong>{invitation.inviter.identifier}</strong> hat dich zu{" "}
              <strong>{invitation.home.name}</strong> eingeladen.
            </span>
          </Stack>
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
