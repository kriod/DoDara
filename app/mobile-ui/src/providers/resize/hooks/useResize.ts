import * as React from "react";
import { ResizeContext } from "../Resize";

export const useResize = () => {
  const ctx = React.useContext(ResizeContext);

  if (ctx == null) {
    throw new Error("ResizeContext not found in hierarchy - but is required");
  }

  return ctx;
};
