import * as React from "react";

import { useExercise } from "../../../providers";

import { HiMinusCircle } from "react-icons/hi2";
import { Label } from "../../../components";
import clsx from "clsx";
import { QuestionDto, ResultDto } from "../../../dtos";

export const WrongView = () => {
  const { currentExerciseResult } = useExercise();

  const getQuestionEntityClassName = React.useCallback(
    ({ valueType }: QuestionDto) => {
      if (valueType === "symbol") {
        return "text-slate-400 text-3xl";
      } else if (valueType === "result") {
        return "bg-red-500 font-bold text-2xl text-white px-4 py-2";
      }
      return "bg-slate-200 font-bold text-2xl p-2";
    },
    [],
  );

  const data = React.useMemo((): ResultDto => {
    const defaulfValue: ResultDto = {
      full: [],
      short: "The selected answer was wrong",
    };

    if (currentExerciseResult == null) {
      return defaulfValue;
    }

    if ((currentExerciseResult.result.full || []).length === 0) {
      return defaulfValue;
    }

    return currentExerciseResult.result;
  }, [currentExerciseResult]);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto space-y-2">
      <div className="flex flex-col jutsify-content items-center w-full">
        <HiMinusCircle className="w-24 h-24 mt-4 mb-4 text-red-500" />
        <div className="mb-12 text-4xl">Not this time</div>
        <div className="w-full space-y-4">
          <Label className="text-xl text-center text-red-500 mb-6 font-bold">
           {data.short} 
          </Label>
          <div className="relative mb-4 overflow-hidden break-all text-center">
            {data.full.map((q, index) => {
              return (
                <div
                  key={`question-entity-${index}`}
                  className={clsx(
                    "inline-block rounded-lg m-2",
                    getQuestionEntityClassName(q),
                  )}
                >
                  {q.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
