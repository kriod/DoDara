import { QuestionDto } from "./Exercise";

export type ResultDto = {
    full: QuestionDto[];
    short: string;
}

export type ExerciseResultDto = {
    isCorrect: boolean;
    currentStars: string;
    earnedStars: string;
    totalStarts: string;
    result: ResultDto;
}