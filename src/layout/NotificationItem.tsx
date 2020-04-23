import anime from "animejs";
import classnames from "classnames";
import React, { useCallback, useEffect, useRef } from "react";
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
  const elementRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    const element = elementRef.current;

    anime({
      complete: () =>
        dispatch({ type: "remove_notification", id: notification.id }),
      duration: TRANSITION_DURATION,
      easing: "easeInOutCubic",
      opacity: [1, 0],
      targets: element,
      translateX: [0, "100%"],
    });
  }, [dispatch, notification.id]);

  const handleClick = () => {
    if (!notification.action) {
      return;
    }

    dismiss();
    notification.action();
  };

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
    const element = elementRef.current;

    anime({
      duration: TRANSITION_DURATION,
      easing: "easeInOutCubic",
      opacity: [0, 1],
      targets: element,
      translateX: ["100%", 0],
    });
  }, [dispatch, notification]);

  useEffect(() => {
    const timeout = setTimeout(dismiss, TRANSITION_DURATION + DISPLAY_DURATION);

    return () => clearTimeout(timeout);
  }, [dismiss]);

  return (
    <Card
      className={classnames("notifications-item", {
        "is-error": notification.type === "error",
        "is-info": notification.type === "info",
        "is-success": notification.type === "success",
      })}
      onClick={handleClick}
      ref={elementRef}
    >
      {icon}
      <span>{notification.message}</span>
    </Card>
  );
};
