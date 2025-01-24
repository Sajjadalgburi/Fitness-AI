import React, { useEffect, useRef } from "react";
import { Message, useChat } from "ai/react";
import { workoutPlans } from "@/utils";
import RenderResponse from "./RenderResponse";
import { User } from "@supabase/supabase-js";
import { WorkoutInfo } from "./FitnessForm";

interface ChatProps {
  user: User;
  workoutInfo: WorkoutInfo | null;
}

const Chat = ({ user, workoutInfo }: ChatProps) => {
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      api: "/api/openai",
    });

  // Automatically send workoutInfo to Sarah AI if available
  useEffect(() => {
    // if (workoutInfo) {
    //   const workoutMessage = `Generate a personalized workout plan based on this data: ${JSON.stringify(
    //     workoutInfo
    //   )}`;
    //   setInput(workoutMessage);
    //   handleSubmit();
    // }
  }, [workoutInfo, setInput, handleSubmit]);

  const chatContainer = useRef<HTMLDivElement>(null);

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
      className="chat overflow-auto flex flex-col justify-between h-full max-w-4xl w-full p-8 mx-auto bg-white shadow-2xl rounded-3xl"
    >
      <div className="flex flex-col justify-between flex-grow">
        {/* Render AI and USER responses */}
        <RenderResponse messages={messages as Message[]} />

        {/* Workout plan selection buttons */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {workoutPlans.map(({ plan, emoji }) => (
              <button
                key={plan}
                className="btn btn-primary"
                onClick={() => handlePlanSubmit(plan)}
                aria-label={`Select ${plan} workout`}
              >
                {emoji} {plan}
              </button>
            ))}
          </div>

          {/* Input form for chat */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            className="bg-dark-forest p-6 max-w-3xl mx-auto w-full rounded-2xl relative flex items-center mt-6"
          >
            <input
              name="input-field"
              type="text"
              aria-label="Chat input"
              placeholder="Ask Sarah AI anything..."
              onChange={handleInputChange}
              value={input}
              maxLength={100}
              minLength={3}
              className="input rounded-full input-bordered input-lg w-full bg-warm-beige text-dark-forest placeholder-dark-forest focus:outline-none"
            />
            <button
              type="submit"
              className="btn btn-accent ml-3"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 tracking-widest opacity-50">
        Responses are subject to AI limitations.
      </p>
    </div>
  );
};

export default Chat;
