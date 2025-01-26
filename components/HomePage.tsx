"use client";

import React, { useState, useEffect } from "react";
import { WorkoutInfo } from "@/interface";
import { createWorkoutAction } from "@/lib/workout.actions";
import { useUser } from "@/hooks/index";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [energyLevel, setEnergyLevel] = useState(5);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [availabilityTime, setAvailabilityTime] = useState("");
  const [preferredWorkout, setPreferredWorkout] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [workoutCreated, setWorkoutCreated] = useState<boolean>(false);
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [workoutId, setWorkoutId] = useState<string | null>(null);

  useEffect(() => {
    if (countdown === 0) {
      router.push(`/workout?id=${workoutId}`); // dynamic route to send the workout id to the workout page
      setWorkoutCreated(false);
    }
  }, [countdown, router, workoutId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (!age || !gender || !weight || !fitnessGoal || !user?.id) {
      setError("Please fill out all required fields.");
      return;
    }

    const w: WorkoutInfo = {
      age,
      gender,
      weight,
      energyLevel,
      fitnessGoal,
      availabilityTime,
      preferredWorkout,
    };

    try {
      setIsLoading(true);
      setError(null);
      const res = await createWorkoutAction(w, user?.id);

      if (!res.success || !res.workoutId) {
        setError("Failed to create workout. Please try again.");
        return;
      }

      setWorkoutId(res.workoutId);
      setWorkoutCreated(true);
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Error creating workout:", err);
      setError("Failed to create workout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white px-4 py-12">
      {/* Hero Section */}
      <div className="w-full lg:w-1/3  text-center mb-8 lg:mb-0">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
          Your Personalized{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            AI
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Fitness
          </span>{" "}
          Coach!
        </h1>
        <p className="text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Discover a new way to stay fit and healthy with personalized workout
          plans and real-time feedback.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-8 shadow-2xl">
        {workoutCreated == true ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">
              Workout Created Successfully! 🎉
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Your personalized workout plan is ready.
            </p>
            <p className="text-purple-400">
              Redirecting in {countdown}{" "}
              {countdown === 1 ? "second" : "seconds"}...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
            {error && (
              <div className="text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <div className="form-group">
                <label className="label-style" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  className="input-style"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => {
                    if (e.target.value.length <= 2) {
                      setAge(e.target.value);
                    }
                  }}
                  min="13"
                  max="99"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-style" htmlFor="weight">
                  Weight (lbs)
                </label>
                <input
                  id="weight"
                  type="number"
                  className="input-style"
                  placeholder="Enter your weight"
                  value={weight}
                  onChange={(e) => {
                    if (e.target.value.length <= 3) {
                      setWeight(e.target.value);
                    }
                  }}
                  min={80}
                  max={400}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-style" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  className="input-style"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Energy Level Section */}
            <div className="form-group">
              <label className="label-style">Energy Level</label>
              <div className="flex flex-wrap lg:flex-nowrap justify-between items-center bg-white/5 rounded-lg p-4">
                {[1, 2, 3, 4, 5].map((level) => (
                  <label
                    key={level}
                    className="flex flex-col items-center cursor-pointer group w-1/5 lg:w-auto mb-2 lg:mb-0"
                  >
                    <input
                      type="radio"
                      name="energy-level"
                      className="hidden"
                      value={level}
                      checked={energyLevel === level}
                      onChange={() => setEnergyLevel(level)}
                      required
                    />
                    <div
                      className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-200 
                      ${
                        energyLevel === level
                          ? "bg-purple-500 text-white scale-110"
                          : "bg-white/20 group-hover:bg-white/30"
                      }`}
                    >
                      {level}
                    </div>
                    <span className="mt-2 text-xs lg:text-sm">
                      {level === 1
                        ? "Low"
                        : level === 3
                          ? "Medium"
                          : level === 5
                            ? "High"
                            : ""}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Goals and Preferences Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="form-group">
                <label className="label-style" htmlFor="fitness-goal">
                  Fitness Goal
                </label>
                <select
                  id="fitness-goal"
                  className="input-style"
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  required
                >
                  <option value="">Select goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                  <option value="flexibility">Flexibility</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label-style" htmlFor="availability-time">
                  Available Time
                </label>
                <select
                  id="availability-time"
                  className="input-style"
                  value={availabilityTime}
                  onChange={(e) => setAvailabilityTime(e.target.value)}
                  required
                >
                  <option value="">Select time</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60+">1 hour or more</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="label-style" htmlFor="preferred-workout">
                Preferred Workout Type
              </label>
              <select
                id="preferred-workout"
                className="input-style"
                value={preferredWorkout}
                onChange={(e) => setPreferredWorkout(e.target.value)}
                required
              >
                <option value="">Select workout type</option>
                <option value="cardio">Cardio</option>
                <option value="strength">Strength Training</option>
                <option value="hiit">HIIT</option>
                <option value="yoga">Yoga</option>
                <option value="pilates">Pilates</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4 lg:pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full lg:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-base lg:text-lg font-semibold 
                  transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 
                  disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Workout...
                  </span>
                ) : user ? (
                  "Create Your Personalized Workout"
                ) : (
                  "Login to Create Workout"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default HomePage;
