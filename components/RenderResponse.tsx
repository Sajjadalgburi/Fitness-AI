import { Message } from "ai/react";
import React from "react";
import Image from "next/image";

interface RenderResponseProps {
  messages: Message[];
}

const RenderResponse = ({ messages }: RenderResponseProps) => {
  return (
    <div className="space-y-4">
      {!messages.length ? (
        <div className="flex justify-center items-center w-full max-w-lg mx-auto sm:mt-[8rem] bg-secondary p-4 rounded-xl shadow-xl">
          <h1 className="text-center text-secondary-content font-semibold px-9 md:text-3xl text-xl capitalize">
            Please fill in the form to get a personalized AI workout routine
            from Sara
          </h1>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <Image
                src="/ai-avatar.jpg"
                alt="AI Avatar"
                width={55}
                height={55}
                className="rounded-full flex justify-start"
              />
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/10 backdrop-blur-sm text-white"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === "user" && (
              <Image
                src="/user.jpg"
                alt="User Avatar"
                width={55}
                height={55}
                className="rounded-full flex justify-end"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RenderResponse;
