import * as React from "react";
import { OverviewContext } from "../Overview";

export const useOverview= () => {
  const ctx = React.useContext(OverviewContext);

  if (ctx == null) {
    throw new Error("OverviewContext not found in hierarchy - but is required");
  }

  return ctx;
};
