import React, { useEffect, useRef, useState } from "react";
import { Message, useChat } from "ai/react";
import { workoutPlans } from "@/utils";
import RenderResponse from "../RenderResponse";
import { WorkoutInfo } from "@/interface";
import UserFooter from "../user-footer";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/hooks";
import { getWorkoutById } from "@/lib/workout.actions";

const Chat: React.FC = () => {
  const searchParams = useSearchParams();
  const workoutId = searchParams.get("id");
  const { user } = useUser();
  const userId = user?.id;

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
  } = useChat({
    api: "/api/openai",
  });

  const [hasSentWorkoutInfo, setHasSentWorkoutInfo] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const chatContainer = useRef<HTMLDivElement>(null);

  // Modified useEffect for auto-submission
  useEffect(() => {
    const autoSubmitWorkout = async () => {
      if (!isInitialLoad || hasSentWorkoutInfo) {
        return;
      }

      if (!workoutId || !userId) return;

      const { data } = await getWorkoutById(Number(workoutId), userId!);

      if (!data?.[0]) {
        return;
      }

      const {
        age,
        energy_level,
        fitness_goal,
        gender,
        weight,
        preferred_workout,
        time_available,
      } = data[0] as WorkoutInfo;

      append({
        role: "user",
        content: `I want a workout plan focused on: age: ${age}, energy level: ${energy_level}, fitness goal: ${fitness_goal}, gender: ${gender}, weight: ${weight}, preferred workout: ${preferred_workout}, time available: ${time_available}`,
      });

      setHasSentWorkoutInfo(true);
      setIsInitialLoad(false);
    };

    autoSubmitWorkout();
  }, [workoutId, userId, hasSentWorkoutInfo, isInitialLoad, append]);

  // auto scroll to bottom when new message is sent
  useEffect(() => {
    scroll();
  }, [messages]);

  const handlePlanSubmit = (plan: string) => {
    if (!plan) return;

    append({
      role: "user",
      content: `I want a workout plan focused on: ${plan}`,
    });
  };

  const scroll = () => {
    if (chatContainer.current) {
      const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
      if (scrollHeight >= scrollTop + offsetHeight) {
        chatContainer.current.scrollTo(0, scrollHeight + 200);
      }
    }
  };

  return (
    <div
      ref={chatContainer}
      className="w-full chat flex flex-col justify-between max-w-3xl h-[80vh] bg-white/10 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-2xl"
    >
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        {messages.length < 1 && (
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 flex-shrink-0">
            Chat with Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              AI
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              Fitness Coach
            </span>
          </h1>
        )}

        {/* Messages Container - Make this scrollable */}
        <div className="flex-grow overflow-y-auto mb-6">
          <RenderResponse messages={messages as Message[]} />
        </div>

        {/* Footer section - Keep this fixed */}
        <div className="flex-shrink-0">
          {messages.length < 1 && (
            // /* Workout plan selection buttons
            <div className="hidden md:flex flex-wrap justify-center gap-4 mb-3">
              {workoutPlans.map(({ plan, emoji }) => (
                <button
                  key={plan}
                  onClick={() => handlePlanSubmit(plan)}
                  aria-label={`Select ${plan} workout`}
                  className="px-3 py-2 md:px-6 md:py-3 bg-white/20 hover:bg-white/30 rounded-full text-white font-semibold 
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
              handleSubmit(e);
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
              disabled={isLoading}
              className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold
                           transform transition-all duration-200 hover:scale-105 hover:shadow-lg
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              aria-label="Send message"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-gray-300 tracking-widest opacity-50">
              Responses are subject to AI limitations.
            </p>
          </div>

          <UserFooter />
        </div>
      </div>
    </div>
  );
};

export default Chat;
