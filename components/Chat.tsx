import React from "react";
import { Message, useChat } from "ai/react";
import { moods } from "@/utils";
import RenderResponse from "./RenderResponse";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai", // calling backend API
  });

  // Change the state to an object for storing key-value pairs of the query
  const [query, setQuery] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    // Only run this when there are messages and the second message exists
    if (messages[1]?.content) {
      const timeoutId = setTimeout(() => {
        const messageContent = messages[1]?.content;

        if (messageContent) {
          // Use regex to extract query parameters (everything after 'query:')
          const regex = /query:\s*(.*)/;
          const match = messageContent.match(regex);

          if (match && match[1]) {
            const queryParamsString = match[1].trim(); // Extract query string
            const queryParamsObject = queryParamsString
              .split(",") // Split by commas
              .map((param) => param.trim()) // Trim spaces
              .filter((param) => param.includes("=")) // Keep key-value pairs
              .reduce((acc: Record<string, string>, param) => {
                const [key, value] = param.split("=");
                acc[key] = value;
                return acc;
              }, {}); // Convert to an object

            setQuery(queryParamsObject); // Set the query state as an object
          }
        }
      }, 2000); // 2-second delay to ensure streaming is finished

      // Cleanup the timeout if the component unmounts or messages change
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);
  console.log(query);

  return (
    <section className="chat flex flex-col justify-between h-full max-w-4xl w-full bg-warm-beige p-8 mx-auto rounded-lg shadow-lg">
      <div className="flex flex-col justify-between flex-grow">
        {/* Render AI and USER response(s) here in a custom COMPONENT */}
        <RenderResponse messages={messages as Message[]} />

        {/* Render moods buttons */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {moods.map(({ mood, emoji }) => (
              <button key={mood} className="btn btn-accent">
                {emoji} {mood}
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
