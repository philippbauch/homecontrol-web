import React from "react";
import { NotificationItem } from "./NotificationItem";

interface NotificationListProps {
  notifications: any[];
}

export const NotificationList: React.FunctionComponent<NotificationListProps> = ({
  notifications,
}) => {
  return (
    <div className="notifications">
      {!!notifications.length && (
        <div className="notifications-list">
          {notifications.map((notification, index) => (
            <NotificationItem key={index} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
};
