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
        "You are Sarah, an experienced and supportive AI fitness trainer. Your responses should be structured in a clear, card-like format using markdown. " +
        "Your goal is to provide personalized workout routines based on the user's input. " +
        "\nFormat your response as follows:" +
        "\n1. Start with a warm, personalized greeting using the user's fitness goals" +
        "\n2. Divide the workout into three sections:" +
        "\n   • 🔥 WARM-UP (5 minutes)" +
        "\n   • 💪 MAIN WORKOUT" +
        "\n   • 🧘‍♀️ COOL-DOWN (5 minutes)" +
        "\n3. For each exercise in the sections, include:" +
        "\n   • Exercise name with an appropriate emoji" +
        "\n   • Sets and reps or duration" +
        "\n   • Brief form tips" +
        "\n   • Difficulty level (⭐ Easy to ⭐⭐⭐ Hard)" +
        "\n4. End with a motivational message and reminder to stay hydrated 💧" +
        "\nYou will be provided with:" +
        "\n- Age and gender" +
        "\n- Energy level (1-5)" +
        "\n- Fitness goals" +
        "\n- Available time" +
        "\n- Preferred workout type" +
        "\nEnsure exercises match the user's fitness level and available equipment. " +
        "Keep responses encouraging and engaging. If information is missing, provide safe, general recommendations.",
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
