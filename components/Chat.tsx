import React from "react";
import { useChat } from "ai/react";
import { moods } from "@/utils";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  return (
    <section className="chat flex flex-col justify-between h-full max-w-4xl w-full bg-warm-beige p-8 mx-auto rounded-lg shadow-lg">
      <div className="flex flex-col justify-between flex-grow">
        <div className="text-dark-forest font-bold text-2xl">User</div>
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {moods.map(({ mood, emoji }) => (
              <button key={mood} className="btn btn-accent">
                {emoji} {mood}
              </button>
            ))}
          </div>

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
