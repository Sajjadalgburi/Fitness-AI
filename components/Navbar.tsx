import Link from "next/link";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

/**
 * Make the navbar smaller !
 */

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchsession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return;
      } else {
        setSession(session);
      }
    };

    fetchsession();
  }, [supabase]);

  return (
    <nav className="shadow-lg mt-4 rounded-xl flex justify-between items-center px-7 py-2 max-w-4xl mx-auto fixed top-0 left-0 right-0 bg-primary-content z-10">
      <h1 className="text-2xl font-bold">
        <Link href="/">Fitness AI 🏋️</Link>
      </h1>

      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <button className="btn font-semibold btn-primary">
              <Link href={"/account"}>Account</Link>
            </button>
            <button className="btn font-semibold btn-secondary">
              <Link href={"/start-chat"}>AI Chat</Link>
            </button>
          </>
        ) : (
          <>
            <button className="btn font-semibold btn-primary">
              <Link href={"/sign-in"}>Login</Link>
            </button>
            <button className="btn font-semibold btn-secondary">
              <Link href={"/sign-up"}>Register</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
