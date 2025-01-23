import { Message } from "ai";
import React from "react";
import Image from "next/image";

interface RenderResponseProps {
  messages: Message[];
}

const RenderResponse: React.FC<RenderResponseProps> = ({ messages }) => {
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
        messages.map((m: Message) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex overflow-hidden rounded-lg shadow-xl w-fit ${
                m.role === "user" ? "bg-accent-content pl-5" : "bg-primary pr-5"
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
                  <p className="font-semibold">
                    {m.role === "user" ? "You" : "AI"}
                  </p>
                  <p className="text-white font-light ">{m.content}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RenderResponse;
