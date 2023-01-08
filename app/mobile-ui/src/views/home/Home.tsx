import * as React from "react";
import clsx from "clsx";

import { HiInbox } from "react-icons/hi2";
import { HiFaceSmile } from "react-icons/hi2";

import { useExercise, useLoading, useOverview } from "../../providers";
import { Header, HistoryItem, Label, Loader, WeekTab } from "../../components";

export const HomeView = () => {
  const { isSectionLoading } = useLoading();
  const { exerciseHistory } = useExercise();
  const { selectedWeekDay } = useOverview();

  const isEmpty = (exerciseHistory || []).length === 0;

  return (
    <React.Fragment>
      <Header
        title="Stats"
        meta="Your week"
        showStars={true}
      />
      <WeekTab />
      <div className={clsx("relative flex-1 justify-center items-center overflow-y-auto", isEmpty ? "flex" : "")}>
        {(exerciseHistory || []).length === 0 && isSectionLoading === false
          ? selectedWeekDay.isCurrent ?
            (
              <div className="text-center space-y-2">
                <HiFaceSmile className="w-24 h-24 text-slate-300 mx-auto" />
                <Label className="text-slate-300 font-bold">You can start anytime</Label>
              </div>
            )
            :
            (
              <div className="text-center space-y-2">
                <HiInbox className="w-24 h-24 text-slate-300 mx-auto" />
                <Label className="text-slate-300 font-bold">No history found</Label>
              </div>
            )
          : (
            <div className="relative w-full space-y-4">
              <Label className="text-slate-400">Your exercise results</Label>
              {(exerciseHistory || []).map((h, index) =>
                <HistoryItem
                  key={`${selectedWeekDay.label}-history-item-${index}`}
                  data={h} />
              )}
            </div>
          )}
        <Loader
          className="absolute left-0 right-0 top-0 bottom-0"
          isVisible={isSectionLoading}
        />
      </div>
    </React.Fragment>
  );
};
