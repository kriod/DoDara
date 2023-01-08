import { CommonProviderProps, ExerciseDto, ExerciseResultDto, HistoryDto } from "../../dtos";

export type ExerciseContextValue = {
    currentExercise: ExerciseDto | null,
    setExercise: (next: ExerciseDto | null) => void;
    exerciseHistory: HistoryDto[] | null;
    setExerciseHistory: (next: HistoryDto[] | null) => void;
    currentExerciseResult: ExerciseResultDto | null;
    onExerciseResult: (next: ExerciseResultDto) => void;
};

export type ExerciseProviderProps = CommonProviderProps;
