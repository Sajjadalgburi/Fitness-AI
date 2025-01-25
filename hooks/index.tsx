import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { WorkoutInfo } from "@/interface";

// Custom hook for managing workout info state
export const useWorkoutInfo = () => {
  const [workoutInfo, setWorkoutInfo] = useState<WorkoutInfo | null>(null);

  // Save workout info to localStorage when it changes
  const saveWorkoutInfo = (info: WorkoutInfo) => {
    setWorkoutInfo(info);
    localStorage.setItem("workoutInfo", JSON.stringify(info));
  };

  // Load workout info from localStorage on initial mount
  useEffect(() => {
    const savedInfo = localStorage.getItem("workoutInfo");
    if (savedInfo) {
      setWorkoutInfo(JSON.parse(savedInfo));
    }
  }, []);

  // Clear workout info from state and localStorage
  const clearWorkoutInfo = () => {
    setWorkoutInfo(null);
    localStorage.removeItem("workoutInfo");
  };

  return {
    workoutInfo,
    saveWorkoutInfo,
    clearWorkoutInfo,
  };
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    // Get initial user and set up auth state listener
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Remove supabase from deps array since it's stable

  return {
    user,
    loading,
  };
};
