import { useState, useEffect } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const WS_URL = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log("connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("disconnected");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};
