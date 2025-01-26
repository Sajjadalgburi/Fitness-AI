import { FormEvent } from "react";

export interface QCardProps {
  handleSubmit: (e: React.FormEvent) => void;
  age: string;
  setAge: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  energyLevel: number;
  setEnergyLevel: (value: number) => void;
  fitnessGoal: string;
  setFitnessGoal: (value: string) => void;
  availabilityTime: string;
  setAvailabilityTime: (value: string) => void;
  preferredWorkout: string;
  setPreferredWorkout: (value: string) => void;
  availableEquipment: string[];
  setAvailableEquipment: (value: string[]) => void;
  isLoading: boolean;
  error: string | null;
}

export interface WorkoutInfo {
  id?: number;
  age: string;
  weight: string;
  gender: string;
  energy_level: number;
  fitness_goal: string;
  time_available: string;
  preferred_workout: string;
}

export interface FitnessQuestionnaireFormProps {
  setGender: (value: string) => void;
  setEnergyLevel: (value: number) => void;
  setFitnessGoal: (value: string) => void;
  setAvailabilityTime: (value: string) => void;
  setPreferredWorkout: (value: string) => void;
  setAvailableEquipment: (value: string[]) => void;
}
