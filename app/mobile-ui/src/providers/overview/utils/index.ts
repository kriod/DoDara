import dayjs from "dayjs";
import { WeekDayDto, WeekTabs } from "../../../dtos";

const getDates = (date: dayjs.Dayjs) => {
  const days: dayjs.Dayjs[] = [];
  const currentDay = date.day();

  if (currentDay > 0) {
    for (let d = -currentDay + 1; d <= 0; d++) {
      const next = date.add(d, "day");
      days.push(next);
    }

    let limit = 7 - days.length;
    for (let d = 1; d <= limit; d++) {
      const next = date.add(d, "day");
      days.push(next);
    }
  } else {
    for (let d = -6 ; d <= 0; d++) {
      const next = date.add(d, "day");
      days.push(next);
    }
  }

  return days;
};

export const calculateWeekDays = (date: dayjs.Dayjs): WeekDayDto[] => {
  const labels = Object.values(WeekTabs);
  const days = getDates(date);

  return days.map((d, i) => {
    const diff = date.diff(d);

    return {
      label: labels[i],
      day: d.day(),
      dayOfMonth: d.date(),
      exactDate: d,
      isCurrent: diff === 0,
      isInFuture: diff < 0,
    };
  });
};

export const getDayByDate = (
  date: dayjs.Dayjs,
  weekDays: WeekDayDto[],
): WeekDayDto | null => {
  const match = weekDays.find((d) => d.exactDate.diff(date, "days") === 0);
  if (match == null) {
    return null;
  }
  return match;
};
