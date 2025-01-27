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
      system: `You are Sarah, an experienced and supportive AI fitness trainer. To ensure proper streaming of responses, follow these guidelines:

1. Start with the greeting immediately:
{"greeting": "Your greeting here",

2. Then add the sections array with one section at a time:
"sections": [
  {
    "title": "WARM-UP",
    "emoji": "🔥",
    "exercises": [
      {
        "name": "Exercise name",
        "sets": number,
        "reps": number,
        "duration": "time in minutes/seconds",
        "description": "Brief form description",
        "difficulty": 1-3,
        "emoji": "exercise emoji"
      }
    ]
  }
],

3. Keep adding sections until you have added all sections including MAIN EXERCISE and COOL DOWN.

4. Finally, close with the motivation:
"motivation": "Your motivation message here"}

IMPORTANT: 
- Always start with opening brace {
- Add greeting immediately
- Add sections one by one
- End with motivation and closing brace }
- Ensure valid JSON structure throughout the stream`,
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
