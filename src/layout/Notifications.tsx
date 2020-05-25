import React from "react";
import { useHistory } from "react-router-dom";
import { NotificationItem } from "./NotificationItem";
import { useNotificationState } from "../contexts/NotificationContext";
import { useSocketEvent, useNotify } from "../hooks";

export const Notifications: React.FunctionComponent = () => {
  const history = useHistory();
  const notifications = useNotificationState();
  const notify = useNotify();

  useSocketEvent("invitation", (invitation: any) => {
    notify.info(
      <span>
        <strong>{invitation.inviter.identifier}</strong> hat dich zu{" "}
        <strong>{invitation.home.name}</strong> eingeladen.
      </span>,
      () => history.push("/invitations")
    );
  });

  return notifications.length ? (
    <div className="notifications">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  ) : null;
};
