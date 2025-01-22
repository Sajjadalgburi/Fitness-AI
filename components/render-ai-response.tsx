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
          className={`chat-line bg-slate-300 ${
            m.role === "user" ? "user-chat" : "ai-chat"
          }`}
        >
          <div style={{ width: "100%", marginLeft: "16px" }}>
            <p className="message">{m.content}</p>
            {index < messages.length - 1 && <div className="horizontal-line" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderResponse;
