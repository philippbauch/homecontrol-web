import { useSocket } from "./useSocket";
import { useEffect } from "react";

export function useSocketEvent(event: string, fn: Function) {
  const { socket } = useSocket();

  useEffect(() => {
    socket.on(event, fn);

    return () => {
      socket.off(event, fn);
    };
  }, [event, fn, socket]);
}
