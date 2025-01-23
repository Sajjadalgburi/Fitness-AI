"use client";

import { useState } from "react";
import Chat from "./Chat";
import UserFooter from "./user-footer";
import { User } from "@supabase/supabase-js";

export default function FitnessForm({ user }: { user: User }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [energyLevel, setEnergyLevel] = useState<number>(0);
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [availabilityTime, setAvailabilityTime] = useState("");
  const [preferredWorkout, setPreferredWorkout] = useState("");
  const [availableEquipment, setAvailableEquipment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      age,
      gender,
      energyLevel,
      fitnessGoal,
      availabilityTime,
      preferredWorkout,
      availableEquipment,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Chat user={user} />

      {/* Questionnaire Card */}
      <div className="flex flex-col justify-center items-center">
        <div className="card w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="card-body p-8">
            <h2 className="card-title text-3xl font-bold mb-8 text-center text-gray-800">
              Fitness AI Questionnaire
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3">
                {/* Age */}
                <div className="w-full md:w-1/4 px-3 mb-6">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="age"
                    className="input input-bordered md:w-1/2 w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="11"
                    max="90"
                    required
                  />
                </div>{" "}
                {/* Weight */}
                <div className="w-full md:w-1/3 px-3 mb-6">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="weight"
                  >
                    weight
                  </label>
                  <input
                    id="weight"
                    type="number"
                    placeholder="Enter your weight"
                    className="input input-bordered md:w-2/3 w-full"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="11"
                    max="90"
                    required
                  />
                </div>
                {/* Gender */}
                <div className="w-full md:w-1/3 mb-6">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="select select-bordered w-full"
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
                {/* Energy Level */}
                <div className="w-full px-3 mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    Energy Level
                  </label>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <label
                        key={level}
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <input
                          type="radio"
                          name="energy-level"
                          className="radio radio-primary"
                          value={level}
                          checked={energyLevel === level}
                          onChange={() => setEnergyLevel(level)}
                          required
                        />
                        <span className="mt-2">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Fitness Goal */}
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="fitness-goal"
                  >
                    Fitness Goal
                  </label>
                  <input
                    id="fitness-goal"
                    type="text"
                    placeholder="Enter your fitness goal"
                    className="input input-bordered w-full"
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    required
                  />
                </div>
                {/* Availability Time */}
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="availability-time"
                  >
                    Availability Time
                  </label>
                  <select
                    id="availability-time"
                    className="select select-bordered w-full"
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
                {/* Preferred Workout */}
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="preferred-workout"
                  >
                    Preferred Workout
                  </label>
                  <select
                    id="preferred-workout"
                    className="select select-bordered w-full"
                    value={preferredWorkout}
                    onChange={(e) => setPreferredWorkout(e.target.value)}
                    required
                  >
                    <option value="">Select workout</option>
                    <option value="bodyweight">Bodyweight</option>
                    <option value="yoga">Yoga</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                  </select>
                </div>
                {/* Available Equipment */}
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label
                    className="block text-lg font-semibold mb-2"
                    htmlFor="available-equipment"
                  >
                    Available Equipment
                  </label>
                  <select
                    id="available-equipment"
                    className="select select-bordered w-full"
                    value={availableEquipment}
                    onChange={(e) => setAvailableEquipment(e.target.value)}
                    required
                  >
                    <option value="">Select equipment</option>
                    <option value="none">None</option>
                    <option value="dumbbells">Dumbbells</option>
                    <option value="resistance-bands">Resistance Bands</option>
                    <option value="full-gym">Full Gym</option>
                  </select>
                </div>
              </div>

              <div className="form-control mt-8">
                <button
                  type="submit"
                  className="btn btn-accent btn-lg rounded-full hover:shadow-lg transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <UserFooter />
      </div>
    </div>
  );
}
