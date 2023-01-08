import * as React from "react";

import { ExerciseContext } from "../Exercise";

export const useExercise = () => {
  const ctx = React.useContext(ExerciseContext);

  if (ctx == null) {
    throw new Error("ExerciseContext not found in hierarchy - but is required");
  }

  return ctx;
};
