const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-white/80 text-lg font-medium">
        Loading your fitness coach...
      </p>
    </div>
  );
};

export default Loading;
