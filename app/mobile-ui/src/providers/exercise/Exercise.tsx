import * as React from "react";
import { ExerciseResultDto, HistoryDto } from "../../dtos";

import { ExerciseDto } from "../../dtos/Exercise";
import { ExerciseContextValue, ExerciseProviderProps } from "./Exercise.types";

export const ExerciseContext = React.createContext<ExerciseContextValue | null>(null);

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {

    const [currentExercise, setExercise] = React.useState<ExerciseDto | null>(null);
    const [exerciseHistory, setExerciseHistory] = React.useState<HistoryDto[] | null>(null);

    const [currentExerciseResult, setExerciseResult] = React.useState<ExerciseResultDto | null>(null);

    const handleResult = React.useCallback((next: ExerciseResultDto) => {
        setExercise(null);
        setExerciseResult(next);
    }, []);

    return <ExerciseContext.Provider value={{
        currentExercise,
        currentExerciseResult,
        setExercise,
        exerciseHistory,
        setExerciseHistory,
        onExerciseResult: handleResult,
    }}>
        {children}
    </ExerciseContext.Provider>
}