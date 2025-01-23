"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import FitnessForm from "../../../components/FitnessForm";
import { useRouter } from "next/navigation";

const Page = () => {
  const supabase = createClient();
  const [user, setUser] = useState<string | null>(null);
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
        setUser(session?.user.user_metadata.email || null);
      }
    };

    fetchUser();
  }, [supabase]);

  console.log(user);

  return (
    <section>
      <FitnessForm />
    </section>
  );
};

export default Page;
