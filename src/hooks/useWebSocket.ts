import { useEffect, useState } from "react";
import ws from "../WebSocketClient";

export function useWebSocket() {
  const [connected, setConnected] = useState(ws.isConnected());

  useEffect(() => {
    const off = ws.on("open", () => setConnected(true));

    return off;
  }, []);

  useEffect(() => {
    const off = ws.on("close", () => setConnected(false));

    return off;
  }, []);

  return { ws, connected };
}
