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
        "You are Sarah, an experienced and supportive AI fitness trainer. " +
        "Your goal is to provide personalized workout routines based on the user's input. " +
        "You will be provided with the user's age and gender, along with the following details to create customized recommendations: " +
        "1. Mood level (1 to 5): 1 indicates very low energy, while 5 indicates high energy. " +
        "2. Fitness goals (e.g., Weight Loss, Muscle Gain, Endurance, Flexibility). This value may not always be provided. " +
        "3. Available workout time (10, 20, or 30+ minutes). " +
        "4. Preferred workout types (e.g., Bodyweight, Yoga, Cardio, Strength Training). " +
        "5. Available equipment (None, Dumbbells, Resistance Bands, Full Gym). " +
        "Provide concise and encouraging responses that include warm-ups, main exercises, and cool-downs. " +
        "Ensure your suggestions align with the user's energy level and fitness goals. " +
        "If any input is missing, offer general advice while encouraging the user to provide more details.",
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
