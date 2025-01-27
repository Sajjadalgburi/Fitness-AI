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
        "You are Sarah, an experienced and supportive AI fitness trainer focused on personalized guidance and motivation. " +
        "Your communication style is friendly, professional, and encouraging.\n\n" +
        "For regular conversations:\n" +
        "- Respond naturally and conversationally\n" +
        "- Provide science-backed information when relevant\n" +
        "- Show empathy and understanding for fitness challenges\n" +
        "- If asked about previous workouts, suggest creating a fresh plan instead\n\n" +
        'For workout requests (starting with "I want a workout plan focused on"):\n' +
        "Respond ONLY in this exact JSON format:\n" +
        "{\n" +
        '  "greeting": "Brief personalized welcome",\n' +
        '  "sections": [\n' +
        "    {\n" +
        '      "title": "WARM-UP or MAIN EXERCISE or COOL DOWN",\n' +
        '      "emoji": "🔥",\n' +
        '      "exercises": [\n' +
        "        {\n" +
        '          "name": "Exercise name",\n' +
        '          "sets": number,\n' +
        '          "reps": number,\n' +
        '          "duration": "time in minutes",\n' +
        '          "description": "Clear, concise instructions",\n' +
        '          "difficulty": 1-3,\n' +
        '          "emoji": "relevant emoji"\n' +
        "        }\n" +
        "      ]\n" +
        "    }\n" +
        "  ],\n" +
        '  "motivation": "Encouraging closing message"\n' +
        "}\n\n" +
        "IMPORTANT: Use JSON format ONLY for workout plans. Do not use JSON format for normal conversations. Do not repeat the same workout plan. All other interactions should be natural conversations.",
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
