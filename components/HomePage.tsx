import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * If user is logged in then redirect to start
 */

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-r text-white px-6 md:px-20">
      {/*  */}
      <div className="flex flex-col items-center md:place-items-start gap-6 text-center md:text-left max-w-3xl">
        <h1 className="font-bold text-4xl md:text-7xl leading-normal">
          Your Personalized <span className="text-secondary">AI</span>{" "}
          <span className="text-primary">
            <i>Fitness</i>
          </span>{" "}
          Coach!
        </h1>
        <p className="text-base font-light max-w-md">
          Discover a new way to stay fit and healthy with personalized workout
          plans and real-time feedback. Let's get moving!
        </p>

        <button className="btn btn-primary font-semibold px-8 py-3">
          <Link href={"/start-chat"}> Get Started</Link>
        </button>
      </div>

      {/*  */}
      <div className="flex flex-col items-center mt-6">
        <Image
          className="rounded-lg shadow-2xl mt-10 md:mt-0 md:ml-12"
          src="/yoga.jpg"
          alt="Fitness AI"
          width={500}
          height={500}
          priority
        />
        <span className="text-xs mt-2 capitalize opacity-50 tracking-widest">
          Application in beta
        </span>
      </div>
    </div>
  );
};

export default HomePage;
