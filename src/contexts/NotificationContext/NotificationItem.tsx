import classnames from "classnames";
import React, { useEffect } from "react";
import { Card } from "../../components";
import { useNotificationDispatch } from "./NotificationContext";
import { InfoIcon, CheckmarkIcon, ErrorIcon } from "../../components/icons";

interface NotificationItemProps {
  notification: any;
}

export const NotificationItem: React.FunctionComponent<NotificationItemProps> = ({
  notification,
}) => {
  const dispatch = useNotificationDispatch();

  const icon = React.useMemo(() => {
    switch (notification.type) {
      case "info":
        return <InfoIcon />;
      case "success":
        return <CheckmarkIcon />;
      case "error":
        return <ErrorIcon />;
    }
  }, [notification.type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "remove_notification", id: notification.id });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch, notification]);

  return (
    <Card
      className={classnames("notifications-item", {
        "is-error": notification.type === "error",
        "is-info": notification.type === "info",
        "is-success": notification.type === "success",
      })}
    >
      {icon}
      <span>{notification.message}</span>
    </Card>
  );
};
