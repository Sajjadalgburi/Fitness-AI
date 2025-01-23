import React, { useEffect, useState } from "react";
import { Message, useChat } from "ai/react";
import { workoutPlans } from "@/utils";
import RenderResponse from "./RenderResponse";
import { User } from "@supabase/supabase-js";

const Chat = ({ user }: { user: User }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai", // calling backend API
  });

  // State for storing query parameters

  return (
    <section className="chat flex flex-col justify-between h-full max-w-4xl w-full p-8 mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="flex flex-col justify-between flex-grow">
        {/* Render AI and USER response(s) here in a custom COMPONENT */}
        <RenderResponse messages={messages as Message[]} />

        {/* Render workoutPlans buttons */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {workoutPlans.map(({ plan, emoji }) => (
              <button key={plan} className="btn btn-primary">
                {emoji} {plan}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSubmit}
            className="bg-dark-forest p-6 max-w-3xl mx-auto w-full rounded-2xl relative flex items-center"
          >
            <input
              name="input-field"
              type="text"
              placeholder="Say anything..."
              onChange={handleInputChange}
              value={input}
              maxLength={100}
              minLength={3}
              className="input rounded-full input-bordered input-lg w-full bg-warm-beige text-dark-forest placeholder-dark-forest focus:outline-none"
            />
            <button type="submit" className="btn btn-accent ml-3">
              Send
            </button>
          </form>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 tracking-widest opacity-50">
        Subject to Error
      </p>
    </section>
  );
};

export default Chat;
