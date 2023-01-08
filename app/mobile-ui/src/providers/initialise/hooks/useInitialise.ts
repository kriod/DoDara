import * as React from "react";
import { InitialiseContext } from "../Initialise";

export const useInitialise = () => {
  const ctx = React.useContext(InitialiseContext);

  if (ctx == null) {
    throw new Error("InitialiseContext not found in hierarchy - but is required");
  }

  return ctx;
};