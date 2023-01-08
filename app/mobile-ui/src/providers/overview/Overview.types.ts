import dayjs from "dayjs";

import { CommonProviderProps, WeekDayDto } from "../../dtos";

export type OverviewContextValue = {
  currentDate: dayjs.Dayjs;
  weekDays: WeekDayDto[];
  selectedWeekDay: WeekDayDto | null;
  setSelectedWeekDay: (next: WeekDayDto) => void; 
};

export type OverviewProviderProps = CommonProviderProps;
