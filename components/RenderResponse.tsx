import React from "react";
import Image from "next/image";
import { RenderResponseProps, WorkoutResponse } from "@/interface";
import { WorkoutSection } from "./workout-card/WorkoutSection";
import { loadingMessages } from "@/utils";
import { LoadingMessage } from "./workout-card/LoadingMessages";

const RenderResponse = ({ messages }: RenderResponseProps) => {
  const renderWorkoutResponse = (content: string) => {
    // Checking if the content is a normal message
    if (typeof content === "string" && !content.includes("{")) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }

    // Checking if the content is a loading message
    if (!content.endsWith("}")) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 p-6">
          <span className="loading loading-spinner loading-lg text-purple-500"></span>
          <LoadingMessage messages={loadingMessages} />
        </div>
      );
    } else {
      // ! This means that the content is a workout message and it ends with a "}"

      // Try to parse the content as JSON
      const workout: WorkoutResponse = JSON.parse(content);

      // If we can parse it as JSON and it has workout-specific fields, render workout card
      return (
        <div className="space-y-4">
          {workout.greeting && (
            <div className="bg-purple-800/30 rounded-lg p-3 border-l-4 border-purple-500">
              <p className="text-lg font-bold text-purple-200">
                {workout.greeting}
              </p>
            </div>
          )}

          {workout.sections?.map((section, idx) => (
            <WorkoutSection key={idx} section={section} />
          ))}

          {workout.motivation && (
            <p className="text-sm text-purple-200 italic mt-4">
              {workout.motivation}
            </p>
          )}
        </div>
      );
    }
  };

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
            className={`flex items-start gap-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <Image
                src="/ai-avatar.jpg"
                alt="AI Avatar"
                width={55}
                height={55}
                className="rounded-full flex-shrink-0 mt-2"
              />
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-white/10 backdrop-blur-sm text-white"
              }`}
            >
              {message.role === "assistant" ? (
                renderWorkoutResponse(message.content)
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
            {message.role === "user" && (
              <Image
                src="/user.jpg"
                alt="User Avatar"
                width={55}
                height={55}
                className="rounded-full flex-shrink-0 mt-2"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RenderResponse;
