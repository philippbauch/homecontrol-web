import React from "react";
import { NotificationItem } from "./NotificationItem";
import { useNotificationState } from "../contexts/NotificationContext";

export const Notifications: React.FunctionComponent = () => {
  const notifications = useNotificationState();

  return notifications.length ? (
    <div className="notifications">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  ) : null;
};
