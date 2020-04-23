import {
  NotificationType,
  useNotificationDispatch,
} from "../contexts/NotificationContext";

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
