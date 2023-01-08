import process from "process";

const BASE_URL = process.env.SERVICE_URL; 

const path = (next: string): string => {
  const root = BASE_URL == null ? "http://localhost:9000" : BASE_URL;
  return `${root}/api/${next}`;
};

export const REQUEST_NEW_ID_URL = path("id/new")

export const REQUEST_ID_EXISTS_URL = path("id/new")

export const REQUEST_STARS_URL = path("stars")

export const REQUEST_EXERCISE_URL = path("exercise/new");

export const REQUEST_EXERCISE_HISTORY_URL = path("exercise/history");

export const SEND_EXERCISE_RESULT_URL = path("exercise/result");

export const REQUEST_PAYOUT = path("payout");