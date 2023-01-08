import { CommonProviderProps, WeekDayDto } from "../../dtos";

export type NetworkContextValue = {
    hasNetwork: boolean;
    setHasNetwork: (next: boolean) => void;
    onEnsureId: () => Promise<string>; 
    onRequestId: (cb?: VoidFunction) => void;
    onRequestStars: (id: string, cb?: VoidFunction) => void;
    onRequestExercise: (id: string, cb?: VoidFunction) => void;
    onRequestExerciseHistory: (day: WeekDayDto, id: string, cb?: VoidFunction) => void;
    onSendExerciseResult:  (exerciseId: string, solutionId: string, id: string, cb?: VoidFunction) => void;
}

export type NetworkProviderProps = CommonProviderProps;