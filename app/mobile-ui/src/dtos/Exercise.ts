export type SolutionDto = {
    id: string;
    value: string;
}

export type QuestionDto = {
    valueType: "variable" | "symbol" | "result";
    value: string;
}

export type ExerciseMetaDto = {
    label: string;
    exerciseType: "mathematic";
}

export type ExerciseDto = {
    id: string;
    meta: ExerciseMetaDto;
    question: QuestionDto[];
    solutions: SolutionDto[]; 
}