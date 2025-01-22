import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("Messages:", messages[0].content); // Output - Messages: Hello

  try {
    const model = openai("gpt-3.5-turbo"); // Choose a model based on your requirements
    if (!model)
      return NextResponse.json({ error: "Model not found" }, { status: 404 });

    const results = streamText({
      model,
      system: "Prompt Engnieering Here to improve AI response",
      prompt: messages[0].content,
    });

    return results.toDataStreamResponse();

    // Catch error if any occurs
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
