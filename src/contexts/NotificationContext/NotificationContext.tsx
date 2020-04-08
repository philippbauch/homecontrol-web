import React, { useReducer } from "react";
import { NotificationList } from "./NotificationList";

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
  message: string;
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
      <NotificationList notifications={notifications} />
    </NotificationContext.Provider>
  );
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
    message: string,
    action?: () => void
  ) {
    const id = NOTIFICATION_COUNTER++;

    const notification = { id, type, message, action };

    dispatch({ type: "add_notification", notification });
  }

  notify.info = (message: string, action?: () => void) =>
    notify("info", message, action);

  notify.success = (message: string, action?: () => void) =>
    notify("success", message, action);

  notify.error = (message: string, action?: () => void) =>
    notify("error", message, action);

  return notify;
}
