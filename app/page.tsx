"use client";
import { useChat } from "ai/react";

const Page = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  const renderResponse = () => {
    /**
     * Note make sure you style the chat messages to your preference
     */

    return (
      <div className="response">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`chat-line bg-slate-300 ${
              m.role === "user" ? "user-chat" : "ai-chat"
            }`}
          >
            <div style={{ width: "100%", marginLeft: "16px" }}>
              <p className="message">{m.content}</p>
              {index < messages.length - 1 && (
                <div className="horizontal-line" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="chat">
      {renderResponse()}
      <form onSubmit={handleSubmit} className="chat-form text-white">
        <input
          name="input-field"
          type="text"
          placeholder="Say anything"
          onChange={handleInputChange}
          value={input}
          className=" text-white"
        />
        <button type="submit" className="send-button" />
      </form>
    </section>
  );
};

export default Page;
