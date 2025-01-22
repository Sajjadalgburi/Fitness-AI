"use client";
import { useChat } from "ai/react";
import Navbar from "./../components/Navbar";
import Chat from "./../components/Chat";

const Page = () => {
  return (
    <main className="">
      <Navbar />

      <Chat />
    </main>
  );
};

export default Page;
