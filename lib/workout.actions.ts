"use server";
import { WorkoutInfo } from "@/interface/index";
import { createClient } from "@/utils/supabase/server";

export const createWorkoutAction = async (
  workoutInfo: WorkoutInfo,
  userId: string
) => {
  const supabase = await createClient();

  // Save the workout data to the Supabase database
  const { error } = await supabase.from("workouts").insert([
    {
      user_id: userId,
      age: workoutInfo.age,
      weight: workoutInfo.weight,
      fitness_goal: workoutInfo.fitnessGoal,
      energy_level: workoutInfo.energyLevel,
      gender: workoutInfo.gender,
      time_available: workoutInfo.availabilityTime,
      preferred_workout: workoutInfo.preferredWorkout,
    },
  ]);

  if (error) {
    console.error("Error inserting workout into workouts table:", error);
    return { error: "Error inserting workout into workouts table" };
  }

  console.log("Workout created successfully");
  return { success: true };
};

// Get all workouts for a user
export const getWorkouts = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return { error: "Error fetching workouts" };
  }

  return { data };
};

export const getWorkoutById = async (workoutId: number, userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", workoutId)
    .eq("user_id", userId);

  if (error) {
    return { error: "Error fetching workout" };
  }

  return { data };
};
