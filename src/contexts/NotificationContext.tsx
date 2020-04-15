import React, { useReducer, useEffect } from "react";
import { Notification as NotificationComponent } from "../components/Notification";
import ws from "../WebSocketClient";

type AddNotificationAction = {
  type: "add_notification";
  notification: Notification;
};

type RemoveNotificationAction = {
  type: "remove_notification";
  id: number;
};

type Action = AddNotificationAction | RemoveNotificationAction;

type Dispatch = (action: Action) => void;

type NotificationType = "info" | "success" | "error";

type Notification = {
  id: number;
  type: NotificationType;
  message: React.ReactNode;
  action?: () => void;
};

function notificationReducer(notifications: Notification[], action: Action) {
  switch (action.type) {
    case "add_notification": {
      return [...notifications, action.notification];
    }
    case "remove_notification": {
      return notifications.filter(
        (notification) => notification.id !== action.id
      );
    }
  }
}

const NotificationContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const NotificationProvider: React.FunctionComponent = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      {children}
      <Notifications notifications={notifications} />
    </NotificationContext.Provider>
  );
};

interface NotificationsProps {
  notifications: Notification[];
}

export const Notifications: React.FunctionComponent<NotificationsProps> = ({
  notifications,
}) => {
  const notify = useNotify();

  useEffect(() => {
    const off = ws.on("invitation", (invitation) => {
      notify.info(
        `${invitation.inviter.identifier} hat dich zu ${invitation.home.name} eingeladen.`
      );
    });

    return off;
  }, [notify]);

  return notifications.length ? (
    <div className="notifications">
      {notifications.map((notification) => (
        <NotificationComponent
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  ) : null;
};

export function useNotificationDispatch() {
  const dispatch = React.useContext(NotificationContext);

  if (dispatch === undefined) {
    throw new Error("useNotify must be used within a NotificationProvider");
  }

  return dispatch;
}

let NOTIFICATION_COUNTER = 0;

export function useNotify() {
  const dispatch = useNotificationDispatch();

  function notify(
    type: NotificationType,
    message: React.ReactNode,
    action?: () => void
  ) {
    const id = NOTIFICATION_COUNTER++;

    const notification = { id, type, message, action };

    dispatch({ type: "add_notification", notification });
  }

  notify.info = (message: React.ReactNode, action?: () => void) =>
    notify("info", message, action);

  notify.success = (message: React.ReactNode, action?: () => void) =>
    notify("success", message, action);

  notify.error = (message: React.ReactNode, action?: () => void) =>
    notify("error", message, action);

  return notify;
}
