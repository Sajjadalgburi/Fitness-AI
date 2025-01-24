"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import FitnessForm from "@/components/FitnessForm";

const Page = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("data", data);
        setUser(data.user);
      }
    };

    fetchData();
  }, [supabase]);

  if (!user) return null;

  return (
    <section>
      <FitnessForm user={user} />
    </section>
  );
};

export default Page;
