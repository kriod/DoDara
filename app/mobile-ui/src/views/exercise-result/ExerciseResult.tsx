import * as React from "react";

import { useExercise, useNavigateToHome } from "../../providers";
import { Button, Header } from "../../components";

import { CorrectView } from "./correct";
import { WrongView } from "./wrong";

export const ExerciseResultView = () => {
  const { currentExerciseResult } = useExercise();
  const toHomeView = useNavigateToHome();

  return (
    <React.Fragment>
      <Header
        title="Result"
        meta="Let's see the"
        showStars={false}
      />
      <div className="flex-1 flex flex-col overflow-y-auto space-y-2">
        {currentExerciseResult == null
          ? <div />
          : currentExerciseResult.isCorrect
          ? <CorrectView />
          : <WrongView />}
      </div>
      <div className="basis-12">
        <Button className="w-full" variant="primary" onClick={toHomeView}>
          Done 
        </Button>
      </div>
    </React.Fragment>
  );
};
