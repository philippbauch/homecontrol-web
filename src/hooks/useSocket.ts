import { useEffect, useState } from "react";
import io from "socket.io-client";

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not specified");
}

const socket = io(API_URL, { autoConnect: false });

export function useSocket() {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    function connect() {
      setConnected(true);
    }

    socket.on("connect", connect);

    return () => {
      socket.off("connect", connect);
    };
  }, []);

  useEffect(() => {
    function disconnect() {
      setConnected(false);
    }

    socket.on("disconnect", disconnect);

    return () => {
      socket.off("disconnect", disconnect);
    };
  }, []);

  return { connected, socket };
}
