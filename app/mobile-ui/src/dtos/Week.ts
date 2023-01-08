import dayjs from "dayjs";

export enum WeekTabs {
  monday = "Mon",
  tuesday = "Tue",
  wednesday = "Wed",
  thirsday = "Thu",
  friday = "Fri",
  saturday = "Sat",
  sunday = "Sun",
}

export type WeekDayDto = {
  label: WeekTabs;
  day: number;
  dayOfMonth: number;
  exactDate: dayjs.Dayjs;
  isInFuture: boolean;
  isCurrent: boolean;
}
