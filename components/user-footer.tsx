import Link from "next/link";
import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Home, User } from "lucide-react";

const UserFooter = () => {
  return (
    <Link
      className="flex mt-2 flex-col items-center text-gray-300 hover:scale-105 transition-all duration-200"
      href="/"
    >
      Home
      <Home />
    </Link>
  );
};

export default UserFooter;
