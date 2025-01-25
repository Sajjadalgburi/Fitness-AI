"use client";

import React from "react";
import { useUser } from "@/hooks";
import { useWorkoutInfo } from "@/hooks";
import Chat from "@/components/AI-Chat/Chat";

const Page = () => {
  const { user } = useUser();
  const { workoutInfo } = useWorkoutInfo();
  if (!user) return null;
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Chat user={user} workoutInfo={workoutInfo} />
    </section>
  );
};

export default Page;
