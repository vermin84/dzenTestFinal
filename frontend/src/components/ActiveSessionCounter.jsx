import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ActiveSessionsCounter() {
  const [count, setCount] = useState(0);

  // Берём URL бекенда из env или используем локальный
  const BACKEND_URL = 
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://dzen-backend-production-7de7.up.railway.app";


  console.log("Connecting to backend at:", BACKEND_URL);

  useEffect(() => {
    const socket = io(BACKEND_URL, {
      transports: ["websocket"], // иногда помогает с CORS и прокси
    });

    socket.on("activeSessions", (value) => {
      console.log("Active sessions:", value);
      setCount(value);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [BACKEND_URL]);

  return <div>Active sessions: {count}</div>;
}
