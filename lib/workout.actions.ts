"use server";
import { WorkoutInfo } from "@/components/FitnessForm";
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
      available_equipment: workoutInfo.availableEquipment,
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
