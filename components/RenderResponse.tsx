import { Message } from "ai";
import React from "react";
import Image from "next/image";

interface RenderResponseProps {
  messages: Message[];
}

const RenderResponse: React.FC<RenderResponseProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex overflow-hidden rounded-xl shadow-xl w-fit  ${
            m.role === "user" ? "bg-accent" : "bg-secondary"
          }`}
        >
          <div
            className={`flex items-start p-4 gap-4 ${
              m.role === "user" ? "flex-row-reverse" : "flex-row justify-start"
            }`}
          >
            <Image
              src={m.role === "user" ? "/user.jpg" : "/ai-avatar.jpg"}
              alt={m.role === "user" ? "User image" : "AI image"}
              width={55}
              height={55}
              className="rounded-full"
            />

            <div
              className={`flex flex-col max-w-sm ${
                m.role === "user"
                  ? "items-end text-right"
                  : "items-start text-left"
              }`}
            >
              <p className="text-base font-bold">
                {m.role === "user" ? "You" : "AI"}
              </p>
              <p className="text-base font-medium">{m.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderResponse;
