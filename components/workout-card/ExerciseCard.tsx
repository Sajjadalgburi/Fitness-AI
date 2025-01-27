import { Exercise } from "@/interface";

export const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const stars = "⭐".repeat(exercise.difficulty || 1);

  return (
    <div className="flex items-center gap-2 bg-purple-900/20 p-3 rounded-md">
      <span className="text-purple-400 text-lg">{exercise.emoji}</span>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{exercise.name}</h4>
          <span className="text-xs text-purple-300">Difficulty: {stars}</span>
        </div>
        {exercise.sets && exercise.reps && (
          <p className="text-sm text-purple-200">
            {exercise.sets} sets × {exercise.reps} reps
          </p>
        )}
        {exercise.duration && (
          <p className="text-sm text-purple-200">{exercise.duration}</p>
        )}
        {exercise.description && (
          <p className="text-xs text-gray-300 mt-1">{exercise.description}</p>
        )}
      </div>
    </div>
  );
};
