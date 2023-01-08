import dayjs from "dayjs";
import * as React from "react";

import { WeekDayDto } from "../../dtos";
import { OverviewContextValue, OverviewProviderProps } from "./Overview.types";
import { calculateWeekDays, getDayByDate as getWeekDayByDate } from "./utils";

export const OverviewContext = React.createContext<OverviewContextValue | null>(
  null,
);

export const OverviewProvider = ({ children }: OverviewProviderProps) => {
  const [currentDate, _setCurrenDate] = React.useState(dayjs());

  const [weekDays, _setWeekDays] = React.useState(
    calculateWeekDays(currentDate),
  );

  const [selectedWeekDay, setSelectedWeekDay] = React.useState<
    WeekDayDto | null
  >(
    getWeekDayByDate(currentDate, weekDays),
  );

  return (
    <OverviewContext.Provider
      value={{
        currentDate,
        weekDays,
        selectedWeekDay,
        setSelectedWeekDay 
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};
