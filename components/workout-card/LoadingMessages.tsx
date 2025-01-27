import { useEffect, useState } from "react";

export const LoadingMessage = ({ messages }: { messages: string[] }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <p className="text-purple-200 text-center animate-fade-in">
      {messages[messageIndex]}
    </p>
  );
};
