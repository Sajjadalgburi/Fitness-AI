"use client";

import React, { useState, useEffect } from "react";
import { createWorkoutAction } from "@/lib/workout.actions";
import { useUser } from "@/hooks/index";
import { useRouter } from "next/navigation";
import { WorkoutInfo } from "@/interface";

const HomePage = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [energy_level, setEnergyLevel] = useState(5);
  const [fitness_goal, setFitnessGoal] = useState("");
  const [time_available, setAvailabilityTime] = useState("");
  const [preferred_workout, setPreferredWorkout] = useState("");
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

    if (!age || !gender || !weight || !fitness_goal || !user?.id) {
      setError("Please fill out all required fields.");
      return;
    }

    const w: WorkoutInfo = {
      age,
      gender,
      weight,
      energy_level,
      fitness_goal,
      time_available,
      preferred_workout,
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
    <div className="min-h-screen flex flex-col lg:flex-row items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white px-4 py-8 lg:py-12">
      {/* Hero Section - Reduced margin on mobile */}
      <div className="w-full lg:w-1/3 mt-4 lg:mt-3 text-center mb-6 lg:mb-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 animate-fade-in-down">
          Your Personalized{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            AI
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Fitness
          </span>{" "}
          Coach!
        </h1>
        <p className="animate-fade-in text-base lg:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Discover a new way to stay fit and healthy with personalized workout
          plans and real-time feedback.
        </p>
      </div>

      {/* Form Section - Reorganized with sections */}
      <div className="animate-fade-in w-full lg:mt-10 xs:w-3/4 xl:w-4/6 mx-3 xs:mx-[5rem] md:mx-[4rem] xl:mx-[7rem] bg-white/10 backdrop-blur-lg rounded-2xl p-6 lg:p-8 shadow-2xl h-[75vh] sm:h-[85vh] flex flex-col">
        {workoutCreated ? (
          <div className="flex flex-col items-center min-h-full justify-center text-center py-12">
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
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {error && (
              <div className="text-red-400 text-xs lg:text-sm font-medium text-center mb-4">
                {error}
              </div>
            )}

            <div className="flex-1 flex flex-col justify-around">
              {/* Section 1: Basic Information */}
              <section>
                <h3 className="text-sm sm:text-lg font-semibold text-purple-300">
                  Basic Information
                </h3>
                <div className="grid grid-cols-3 gap-3 lg:gap-6">
                  <div className="form-group space-y-1">
                    <label
                      className="label-style text-xs lg:text-sm"
                      htmlFor="age"
                    >
                      Age
                    </label>
                    <input
                      id="age"
                      type="number"
                      className="input-style sm:h-14 h-10 text-sm md:text-base"
                      placeholder="Age"
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

                  <div className="form-group space-y-1">
                    <label
                      className="label-style text-xs lg:text-sm"
                      htmlFor="weight"
                    >
                      Weight (lbs)
                    </label>
                    <input
                      id="weight"
                      type="number"
                      className="input-style sm:h-14 h-10 text-sm md:text-base"
                      placeholder="Weight"
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

                  <div className="form-group space-y-1">
                    <label
                      className="label-style text-xs lg:text-sm"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="input-style sm:h-14 h-10 text-sm md:text-base"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 2: Energy Level */}
              <section>
                <h3 className="text-sm sm:text-lg font-semibold text-purple-300">
                  Energy Level
                </h3>
                <div className="form-group space-y-2">
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-2 lg:p-4">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <label
                        key={level}
                        className="flex flex-col items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="energy-level"
                          className="hidden"
                          value={level}
                          checked={energy_level === level}
                          onChange={() => setEnergyLevel(level)}
                          required
                        />
                        <div
                          className={`w-8 h-8 sm: md:w-14 sm:h-14 rounded-full flex items-center justify-center text-sm md:text-lg font-semibold transition-all duration-200 
                          ${
                            energy_level === level
                              ? "bg-purple-500 text-white scale-110"
                              : "bg-white/20 group-hover:bg-white/30"
                          }`}
                        >
                          {level}
                        </div>
                        <span className="mt-1 text-[10px] lg:text-sm">
                          {level === 1
                            ? "Low"
                            : level === 3
                              ? "Med"
                              : level === 5
                                ? "High"
                                : ""}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: Goals and Time */}
              <section>
                <h3 className="text-sm sm:text-lg font-semibold text-purple-300">
                  Goals & Availability
                </h3>
                <div className="grid grid-cols-2 gap-3 lg:gap-6">
                  <div className="form-group space-y-1">
                    <label
                      className="label-style text-xs lg:text-sm"
                      htmlFor="fitness-goal"
                    >
                      Fitness Goal
                    </label>
                    <select
                      id="fitness-goal"
                      className="input-style sm:h-14 h-10 text-sm md:text-base"
                      value={fitness_goal}
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

                  <div className="form-group space-y-1">
                    <label
                      className="label-style text-xs lg:text-sm"
                      htmlFor="availability-time"
                    >
                      Available Time
                    </label>
                    <select
                      id="availability-time"
                      className="input-style sm:h-14 h-10 text-sm md:text-base"
                      value={time_available}
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
              </section>

              {/* Section 4: Workout Preferences */}
              <section>
                <h3 className="text-sm sm:text-lg font-semibold text-purple-300">
                  Workout Preferences
                </h3>
                <div className="form-group">
                  <label
                    className="label-style text-xs lg:text-sm"
                    htmlFor="preferred-workout"
                  >
                    Preferred Workout Type
                  </label>
                  <select
                    id="preferred-workout"
                    className="input-style sm:h-14 h-10 text-sm md:text-base"
                    value={preferred_workout}
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
              </section>

              {/* Submit Button Section */}
              <section className="flex justify-center sm:mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-accent rounded-2xl md:w-1/2 sm:text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center">
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
              </section>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default HomePage;
