import React from "react";

const Loading = () => {
  return (
    <section className="p-6">
      <div className="space-y-4">
        <div className="skeleton h-12 w-full"></div>
        <div className="skeleton h-8 w-3/4"></div>
        <div className="skeleton h-8 w-1/2"></div>
      </div>
    </section>
  );
};

export default Loading;
