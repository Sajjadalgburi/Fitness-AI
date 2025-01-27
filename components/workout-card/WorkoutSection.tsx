import { ExerciseCard } from "./ExerciseCard";
import { WorkoutSectionInterface } from "@/interface";

export const WorkoutSection = ({
  section,
}: {
  section: WorkoutSectionInterface;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg md:text-2xl font-semibold text-purple-200 border-l-4 border-purple-500 pl-2">
        {section.emoji} {section.title}
      </h3>
      <div className="space-y-2">
        {section.exercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};
