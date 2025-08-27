import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ActiveSessionsCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("activeSessions", (value) => {
      console.log("Active sessions:", value);
      setCount(value);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Active sessions: {count}</div>;
}
