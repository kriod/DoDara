import * as React from "react";

import { useExercise } from "../../../providers";

import { HiStar } from "react-icons/hi2";
import { Label } from "../../../components";

export const CorrectView = () => {
  const { currentExerciseResult } = useExercise();

  return (
    <React.Fragment>
      <div className="flex-1 flex flex-col overflow-y-auto space-y-2">
            <div className="flex flex-col jutsify-content items-center w-full">
              <HiStar className="w-24 h-24 mt-4 mb-4 text-yellow-400" />
              <div className="mb-12 text-4xl">
                Congratulations 
              </div>
              <div className="w-full space-y-4">
                <Label className="text-slate-400  flex flex-row space-x-1 items-center">
                  <div className="flex-1 text-lg">Current</div>
                  <div className="bg-slate-200 bg-opacity-50 font-bold px-4 py-2  w-40 rounded-2xl text-center truncate">
                    {currentExerciseResult.currentStars}
                  </div>
                </Label>
                <Label className="text-slate-400  flex flex-row space-x-1 items-center">
                  <div className="flex-1 text-lg">Earned</div>
                  <div className="bg-yellow-400 font-bold px-4 py-2 w-40 rounded-2xl text-center truncate text-yellow-800">
                    {currentExerciseResult.earnedStars}
                  </div>
                </Label>
                <div className="border-b-4" />
                <Label className="text-slate-400  flex flex-row space-x-1 items-center">
                  <div className="flex-1 font-bold text-lg">Total</div>
                  <div className="bg-emerald-400 text-white font-bold p-4 w-40 px-4 py-2 rounded-2xl text-center truncate font-bold">
                    {currentExerciseResult.totalStarts}
                  </div>
                </Label>
              </div>
            </div>
            </div>
    </React.Fragment>
  );
};
