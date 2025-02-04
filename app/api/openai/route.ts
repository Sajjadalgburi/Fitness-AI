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

    const model = openai("gpt-4o"); // Choose a model based on your requirements
    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }

    // Stream text from the AI model
    const results = await streamText({
      model,
      system:
        "You are Sarah, an experienced and supportive AI fitness trainer focused on personalized guidance and motivation. " +
        "Your communication style is friendly, professional, and encouraging.\n\n" +
        "For general conversations:\n" +
        "- Respond naturally and conversationally\n" +
        "- Provide science-backed fitness advice when relevant\n" +
        "- Show empathy and understanding for fitness challenges\n\n" +
        "For workout requests (starting with 'I want a workout plan focused on'):\n" +
        "1. ALWAYS generate a **new workout plan** with varied exercises to prevent repetition.\n" +
        "2. If the user asks for a 'different workout' or 'new plan,' create a fresh plan that does not repeat previous exercises.\n" +
        "3. Do NOT ask for confirmation—just generate a new workout plan.\n" +
        "4. Incorporate diverse exercises, alternating intensity, muscle groups, and workout styles.\n\n" +
        "FORMAT:\n" +
        "Respond ONLY in this exact JSON format for workout plans:\n" +
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
        "IMPORTANT:\n" +
        "- **NEVER repeat the same workout plan** unless the user explicitly asks for it.\n" +
        "- **DO NOT** include JSON formatting in normal conversations—only for workout plans.\n" +
        "- **Suggest only one workout plan at a time**. If the user asks for multiple, recommend creating a fresh plan for each session.\n",
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
