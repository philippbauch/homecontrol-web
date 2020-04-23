import React, { useReducer } from "react";

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

export type NotificationType = "info" | "success" | "error";

export type Notification = {
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

const NotificationStateContext = React.createContext<
  Notification[] | undefined
>(undefined);
const NotificationDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const NotificationProvider: React.FunctionComponent = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  return (
    <NotificationStateContext.Provider value={notifications}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

export function useNotificationState() {
  const context = React.useContext(NotificationStateContext);

  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }

  return context;
}

export function useNotificationDispatch() {
  const dispatch = React.useContext(NotificationDispatchContext);

  if (dispatch === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }

  return dispatch;
}
