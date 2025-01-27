import Link from "next/link";
import React from "react";
import { signOutAction } from "@/app/actions";
import { useUser } from "@/hooks/index";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="shadow-lg mx-6 md:mt-4 rounded-xl flex justify-between items-center px-7 py-2 max-w-4xl md:mx-auto md:fixed top-0 left-0 right-0 bg-white md:z-10">
      <h1 className="text-2xl font-bold text-black">
        <Link href="/">Fitness AI 🏋️</Link>
      </h1>

      <div className="flex items-center space-x-4">
        {user !== null ? (
          <>
            <button
              className="btn btn-primary btn-sm md:btn-md"
              onClick={signOutAction}
            >
              Logout
            </button>

            <button className="btn font-semibold btn-secondary btn-sm md:btn-md">
              <Link href={"/workout"}>AI Chat</Link>
            </button>
          </>
        ) : (
          <>
            <button className="btn font-semibold btn-primary btn-sm md:btn-md">
              <Link href={"/sign-in"}>Login</Link>
            </button>
            <button className="btn font-semibold btn-secondary btn-sm md:btn-md">
              <Link href={"/sign-up"}>Register</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
