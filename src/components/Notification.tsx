import anime from "animejs";
import classnames from "classnames";
import React, { useEffect, useRef } from "react";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import { Card } from "../components";
import { CheckmarkIcon, ErrorIcon, InfoIcon } from "../components/icons";

const DISPLAY_DURATION = 3000;
const TRANSITION_DURATION = 200;

interface NotificationItemProps {
  notification: any;
}

export const Notification: React.FunctionComponent<NotificationItemProps> = ({
  notification,
}) => {
  const dispatch = useNotificationDispatch();
  const elementRef = useRef<HTMLDivElement>(null);

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
    let timeout: any;

    anime({
      complete: () => {
        timeout = setTimeout(() => {
          anime({
            complete: () => {
              dispatch({ type: "remove_notification", id: notification.id });
            },
            duration: TRANSITION_DURATION,
            easing: "easeInOutCubic",
            opacity: [1, 0],
            targets: element,
            translateX: [0, "100%"],
          });
        }, DISPLAY_DURATION);
      },
      duration: TRANSITION_DURATION,
      easing: "easeInOutCubic",
      opacity: [0, 1],
      targets: element,
      translateX: ["100%", 0],
    });

    return () => {
      anime.remove(element);
      clearTimeout(timeout);
    };
  }, [dispatch, notification]);

  return (
    <Card
      className={classnames("notifications-item", {
        "is-error": notification.type === "error",
        "is-info": notification.type === "info",
        "is-success": notification.type === "success",
      })}
      ref={elementRef}
    >
      {icon}
      <span>{notification.message}</span>
    </Card>
  );
};
