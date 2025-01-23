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
          className={`flex ${
            m.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex overflow-hidden rounded-lg shadow-xl w-fit ${
              m.role === "user" ? "bg-accent pl-5" : "bg-secondary pr-5"
            }`}
          >
            <div
              className={`flex items-start p-4 gap-4 ${
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Image
                src={m.role === "user" ? "/user.jpg" : "/ai-avatar.jpg"}
                alt={m.role === "user" ? "User image" : "AI image"}
                width={43}
                height={43}
                className="rounded-full justify-center flex items-center"
              />
              <div
                className={`flex flex-col max-w-sm ${
                  m.role === "user"
                    ? "items-end text-right"
                    : "items-start text-left"
                }`}
              >
                <p className="font-semibold text-base-300">
                  {m.role === "user" ? "You" : "AI"}
                </p>
                <p className="text-white font-normal">{m.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderResponse;
