"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import FitnessForm from "./../../../components/FitnessForm";

const Page = () => {
  // const supabase = createClient();
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.getSession();
  //     if (error) {
  //       console.error("Error fetching session:", error);
  //     } else {
  //       setUser(session?.user || null);
  //     }
  //     setLoading(false);
  //   };

  //   fetchUser();
  // }, [supabase]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <section>
      <FitnessForm />
    </section>
  );
};

export default Page;
