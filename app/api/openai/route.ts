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
      system: `You are Sarah, an experienced and supportive AI fitness trainer. Your primary role is to engage in natural conversations about fitness, health, and wellness.

For regular conversations:
- Respond naturally without any specific format
- Provide informative and encouraging responses
- If user asks about a previous workout, don't repeat it - instead, suggest creating a different plan

For workout plan requests ONLY:
Respond in this exact JSON format:
{"greeting": "...",
 "sections": [
   {
     "title": "WARM-UP|MAIN EXERCISE|COOL DOWN",
     "emoji": "🔥",
     "exercises": [
       {
         "name": "...",
         "sets": number,
         "reps": number,
         "duration": "...",
         "description": "...",
         "difficulty": 1-3,
         "emoji": "..."
       }
     ]
   }
 ],
 "motivation": "..."}

CRITICAL: Only use JSON format when creating a new workout plan. For all other interactions, respond conversationally.`,
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
