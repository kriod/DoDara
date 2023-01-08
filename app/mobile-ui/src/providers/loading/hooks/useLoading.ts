import * as React from "react";
import { LoadingContext } from "../Loading";

export const useLoading = () => {
  const ctx = React.useContext(LoadingContext);

  if (ctx == null) {
    throw new Error("LoadingContext not found in hierarchy - but is required");
  }

  return ctx;
};
