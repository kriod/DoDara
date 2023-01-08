import clsx from "clsx";
import * as React from "react";
import { WeekDayDto } from "../../dtos";

import { useId, useNetwork, useOverview } from "../../providers";
import { Label } from "../label";

export const WeekTab = () => {

  const {weekDays, selectedWeekDay} = useOverview();
  const {id} = useId();
  const {onRequestExerciseHistory} = useNetwork();

  const handleSelectWeekDay = React.useCallback((next: WeekDayDto) => () => {
    if (next.isInFuture) {
      return;
    }
    onRequestExerciseHistory(next, id);
  }, [id, onRequestExerciseHistory]);

  return (
    <div className="flex flex-row gap-2 mt-6">
      {(weekDays || []).map((d) => {
        const {day, label, dayOfMonth, isInFuture} = d ;
        const isCurrentDay = selectedWeekDay.label === label;

        return (
          <div
            key={`weekday-${day}`}
            className={clsx(
              "flex-1 text-center py-2 rounded-2xl transition-color duration-500 cursor-pointer",
              isCurrentDay ? "bg-blue-100" : "bg-transparent",
              isInFuture ? "opacity-40" : "opacity-100",
              "hover:bg-slate-200"
            )}
            onClick={handleSelectWeekDay(d)}
          >
            <div className={clsx(isCurrentDay ? "text-sky-500" : "text-slate-400")}>{label}</div>
            <Label className={clsx(isCurrentDay ? "text-sky-500" : "text-slate-400")}>{dayOfMonth}</Label>
            <div className={clsx(
              "w-2 h-2  rounded-full mx-auto mt-2 mb-1",
              isCurrentDay ? "bg-sky-500" : "bg-slate-400")
            }/>
          </div>
        );
      })}
    </div>
  );
};
