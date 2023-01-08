import * as React from "react";
import { IdContext } from "../Id";

export const useId = () => {
  const ctx = React.useContext(IdContext);

  if (ctx == null) {
    throw new Error("IdContext not found in hierarchy - but is required");
  }

  return ctx;
};
