import React, { useEffect, useRef, useState } from "react";
import { Message, useChat } from "ai/react";
import { workoutPlans } from "@/utils";
import RenderResponse from "../RenderResponse";
import { User } from "@supabase/supabase-js";
import { WorkoutInfo } from "@/interface";
import UserFooter from "../user-footer";

interface ChatProps {
  user: User;
  workoutInfo: WorkoutInfo | null;
}

const Chat = ({ user, workoutInfo }: ChatProps) => {
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/openai",
    });

  const chatContainer = useRef<HTMLDivElement>(null);
  const [hasSentWorkoutInfo, setHasSentWorkoutInfo] = useState(false);
  const [storedWorkoutInfo, setStoredWorkoutInfo] =
    useState<WorkoutInfo | null>(null);

  // Store workoutInfo when it becomes available
  useEffect(() => {
    if (workoutInfo) {
      console.log("Setting stored workout info:", workoutInfo);
      setStoredWorkoutInfo(workoutInfo);
    }
  }, [workoutInfo]);

  // Modified useEffect for auto-submission
  useEffect(() => {
    const autoSubmitWorkout = async () => {
      if (storedWorkoutInfo && !hasSentWorkoutInfo) {
        console.log("Attempting to auto-submit");
        const workoutMessage = `Generate a personalized workout plan based on this data: ${JSON.stringify(
          storedWorkoutInfo
        )}`;

        try {
          // Only set this to true if the submission was successful
          setHasSentWorkoutInfo(true);
        } catch (error) {
          console.error("Error auto-submitting:", error);
        }
      }
    };

    autoSubmitWorkout();
  }, [storedWorkoutInfo, hasSentWorkoutInfo, handleSubmit, setInput]);

  useEffect(() => {
    chatContainer.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handlePlanSubmit = (plan: string) => {
    setInput(`I want a workout plan focused on: ${plan}`);
    handleSubmit();
  };

  return (
    <div
      ref={chatContainer}
      className="w-full chat flex flex-col justify-between max-w-3xl h-fit bg-white/10 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-2xl"
    >
      <div className="flex flex-col justify-between flex-grow">
        {/* Chat Header */}
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">
          Chat with Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            AI
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Fitness Coach
          </span>
        </h1>

        {/* Messages Container */}
        <div className="flex-grow overflow-auto">
          <RenderResponse messages={messages as Message[]} />
        </div>

        <div className="mt-8 text-center space-y-6">
          {/* Workout plan selection buttons */}
          {messages.length < 1 && (
            <div className="flex flex-wrap justify-center gap-4">
              {workoutPlans.map(({ plan, emoji }) => (
                <button
                  key={plan}
                  onClick={() => handlePlanSubmit(plan)}
                  aria-label={`Select ${plan} workout`}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white font-semibold 
                            transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  {emoji} {plan}
                </button>
              ))}
            </div>
          )}

          {/* Input form for chat */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (storedWorkoutInfo !== null) {
                const workoutMessage = `Generate a personalized workout plan based on this data: ${JSON.stringify(
                  storedWorkoutInfo
                )}`;
                handleSubmit(e, {
                  data: workoutMessage,
                });
              } else {
                handleSubmit(e);
              }
            }}
            className="relative flex items-center gap-3 mt-6"
          >
            <input
              name="input-field"
              type="text"
              aria-label="Chat input"
              placeholder="Ask your AI coach anything..."
              onChange={handleInputChange}
              value={input}
              maxLength={100}
              minLength={3}
              className="w-full px-6 py-4 bg-white/20 rounded-full text-white placeholder-gray-300
                           focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold
                           transform transition-all duration-200 hover:scale-105 hover:shadow-lg
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <p className="text-sm text-gray-300 tracking-widest opacity-50">
          Responses are subject to AI limitations.
        </p>
      </div>

      <UserFooter />
    </div>
  );
};

export default Chat;
