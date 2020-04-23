import React, { useCallback, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Card } from "../components";
import { CheckmarkIcon, ErrorIcon, InfoIcon } from "../components/icons";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const DISPLAY_DURATION = 3000;
const TRANSITION_DURATION = 200;

interface NotificationItemProps {
  notification: any;
}

export const NotificationItem: React.FunctionComponent<NotificationItemProps> = ({
  notification,
}) => {
  const dispatch = useNotificationDispatch();
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => setVisible(false), []);

  const handleClick = () => {
    dismiss();
    notification.action();
  };

  const removeNotification = () =>
    dispatch({ type: "remove_notification", id: notification.id });

  const icon = React.useMemo(() => {
    switch (notification.type) {
      case "info":
        return <InfoIcon />;
      case "success":
        return <CheckmarkIcon />;
      case "error":
        return <ErrorIcon />;
    }
  }, [notification]);

  useEffect(() => {
    const timeout = setTimeout(dismiss, TRANSITION_DURATION + DISPLAY_DURATION);

    return () => clearTimeout(timeout);
  }, [dismiss]);

  return (
    <CSSTransition
      appear={true}
      classNames="notifications-item"
      in={visible}
      onExited={removeNotification}
      timeout={TRANSITION_DURATION}
    >
      <Card
        className="notifications-item"
        onClick={notification.action && handleClick}
      >
        {icon}
        <span>{notification.message}</span>
      </Card>
    </CSSTransition>
  );
};
