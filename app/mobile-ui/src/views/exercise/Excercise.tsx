import clsx from "clsx";
import * as React from "react";

import { useExercise, useNavigation, useOverview } from "../../providers";
import { Header, Label } from "../../components";
import { QuestionDto } from "../../dtos/Exercise";

export const ExerciseView = () => {

  const { currentExercise } = useExercise();
  const { selectedWeekDay } = useOverview();
  const { toExerciseResultView, toHomeView } = useNavigation();

  const getQuestionEntityClassName = React.useCallback(({ valueType }: QuestionDto) => {
    if (valueType === "symbol") {
      return "text-slate-400 text-3xl";
    } else if (valueType === "result") {
      return "bg-sky-500 font-bold text-2xl text-white px-4 py-2";
    }
    return "bg-slate-200 font-bold text-2xl p-2";
  }, []);

  const labelContent = React.useMemo(() => {
    if (currentExercise == null || currentExercise.meta == null) {
      return "";
    }

    return currentExercise.meta.label;
  }, [currentExercise]);

  const question = React.useMemo(() => {
    if (currentExercise == null || currentExercise.meta == null) {
      return "";
    }

    switch (currentExercise.meta.exerciseType) {
      case "mathematic":
        return "Please select the correct answer";
      default:
        return "";
    };
  }, [currentExercise]);

  React.useEffect(() => {
    if (currentExercise != null) {
      return;
    }

    toHomeView(selectedWeekDay);
  }, [selectedWeekDay, currentExercise, toHomeView])

  return (
    <React.Fragment>
      <Header
        title="Exercise"
        meta={labelContent}
        showStars={true}
      />
      <div className="relative flex-1 overflow-y-auto">
        {currentExercise && <React.Fragment>
          <div className="relative mb-4 overflow-hidden break-all text-center">
            {currentExercise.question.map((q, index) => {
              return (<div
                key={`question-entity-${index}`}
                className={clsx(
                  "inline-block rounded-lg m-2",
                  getQuestionEntityClassName(q)
                )}
              >
                {q.value}
              </div>
              )
            })}
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-xl text-center text-slate-400 mb-6">
              {question}
            </Label>
            <div className="flex flex-col rounded-2xl gap-4">
              {currentExercise.solutions.map((s, index) => {
                return (<div
                  key={`solution-entity-${index}`}
                  className={clsx(
                    "rounded-2xl",
                    "bg-slate-200 p-4 text-2xl font-bold text-center"
                  )}
                  onClick={() => toExerciseResultView(currentExercise.id, s.id)}
                >
                  {s.value}
                </div>
                )
              })}
            </div>
          </div>
        </React.Fragment>
        }
      </div>
    </React.Fragment>
  );
};
