import Link from "next/link";
import React from "react";
import { Home, User } from "lucide-react";

const UserFooter = () => {
  return (
    <footer className="flex gap-3 justify-around items-center w-full max-w-xs  text-warm-beige overflow-hidden mt-2 mx-auto">
      <Link
        className="flex flex-col items-center gap-1 text-gray-300 hover:scale-105 transition-all duration-200"
        href="/"
      >
        Home
        <Home />
      </Link>
      <Link
        className="flex flex-col items-center gap-1 text-gray-300 hover:scale-105  transition-all "
        href="/account"
      >
        Account
        <User />
      </Link>
    </footer>
  );
};

export default UserFooter;
