"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import FitnessForm from "../../../components/FitnessForm";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const Page = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        return router.push("/sign-in");
      } else {
        setUser(session?.user || null);
      }
    };

    fetchUser();
  }, [supabase]);

  if (!user) return null;

  return (
    <section>
      <FitnessForm user={user} />
    </section>
  );
};

export default Page;
