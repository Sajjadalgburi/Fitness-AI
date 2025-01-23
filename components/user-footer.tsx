import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Home, User } from "lucide-react";

const UserFooter = () => {
  return (
    <footer className="flex flex-col gap-3 justify-around items-center w-full max-w-xs bg-white shadow-xl rounded-lg p-2 overflow-hidden sm:mt-9">
      <div className="flex gap-x-20">
        <Link className="flex flex-col items-center gap-1" href="/home">
          Home
          <Home />
        </Link>
        <Link className="flex flex-col items-center gap-1" href="/account">
          Account
          <User />
        </Link>
      </div>

      <span>Fitness AI &copy; {new Date().getFullYear()}</span>
    </footer>
  );
};

export default UserFooter;
