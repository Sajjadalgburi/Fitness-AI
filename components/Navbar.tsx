import Link from "next/link";
import React from "react";
import { signOutAction } from "@/app/actions";
import { useUser } from "@/hooks/index";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="shadow-lg mx-4 my-4  lg:my-0 rounded-xl z-50 lg:fixed lg:top-0 lg:left-0 lg:right-0 flex flex-wrap justify-between items-center px-4 sm:px-7 py-3 max-w-4xl lg:mx-auto bg-white">
      <h1 className="text-xl sm:text-2xl font-bold text-black hover:text-primary transition-colors">
        <Link href="/">Fitness AI 🏋️</Link>
      </h1>

      <div className="flex items-center gap-3 sm:gap-4">
        {user !== null ? (
          <>
            <button
              className="btn btn-primary btn-sm sm:btn-md hover:opacity-90 transition-opacity"
              onClick={signOutAction}
            >
              Logout
            </button>

            <Link
              href="/workout"
              className="btn btn-secondary btn-sm sm:btn-md hover:opacity-90 transition-opacity"
            >
              AI Chat
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="btn btn-primary btn-sm sm:btn-md hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="btn btn-secondary btn-sm sm:btn-md hover:opacity-90 transition-opacity"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
