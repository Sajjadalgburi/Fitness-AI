import { Message } from "ai";
import React from "react";

interface RenderResponseProps {
  messages: Message[];
}

const RenderResponse: React.FC<RenderResponseProps> = ({ messages }) => {
  return (
    <div className="response">
      {messages.map((m, index) => (
        <div
          key={m.id}
          className={`flex items-center p-8 border-b-4 bg-slate-300 ${
            m.role === "user" ? "user-chat" : "ai-chat"
          }`}
        >
          <div className="flex m-8">
            <p className="message">{m.content}</p>
            {index < messages.length - 1 && <div className="horizontal-line" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderResponse;
