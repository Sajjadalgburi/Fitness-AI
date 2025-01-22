import React from "react";
import { useChat } from "ai/react";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });
  return (
    <section className="chat flex flex-col justify-between h-full max-w-5xl w-full ">
      <div className="flex flex-col justify-between flex-grow">
        <div>User</div>
        <form
          onSubmit={handleSubmit}
          className="bg-accent-content p-8 max-w-3xl mx-auto w-full rounded-2xl relative"
        >
          <input
            name="input-field"
            type="text"
            placeholder="Say anything"
            onChange={handleInputChange}
            value={input}
            maxLength={100}
            minLength={3}
            className=" bg-transparent border-none outline-none text-white "
          />
          <button
            type="button"
            className="btn absolute right-2 bottom-1 font-bold uppercase"
          >
            send
          </button>
        </form>
      </div>
      <p className="text-center font-base tracking-wider">Subject to Error</p>
    </section>
  );
};

export default Chat;
