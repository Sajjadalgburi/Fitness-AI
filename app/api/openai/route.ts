import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Ensure that messages and content exist
    if (!messages || !messages[0]?.content) {
      return NextResponse.json(
        { error: "No valid content in the request." },
        { status: 400 }
      );
    }

    console.log("Messages:", messages[0]?.content); // Log the content

    const model = openai("gpt-3.5-turbo"); // Choose a model based on your requirements
    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    // Stream text from the AI model
    const results = await streamText({
      model,
      system:
        "You are Sarah, a movie expert working for MoodFlix! " +
        "Your role is to help users find movies based on their mood or a description of a movie they've seen. " +
        "Upon receiving a user's input, first reassure them with a friendly and engaging response. " +
        "Then, analyze their input and return a concise query that the MoodFlix application will use to call the TMDb API. " +
        "Ensure your response is structured clearly and is easy to extract programmatically. " +
        "Format your response exactly as follows: " +
        "reassurance_message, query: keyword=[value], genre=[value], sort_by=[value]. Do not add desc." +
        "Make sure there are no line breaks or extra spaces between elements in the response. " +
        "Always use lowercase for keys and values, and separate query parameters with commas and spaces. ",
      prompt: messages[0].content,
    });

    return results.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
