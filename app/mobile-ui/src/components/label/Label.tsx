import clsx from "clsx";
import * as React from "react";

import { LabelProps } from "./Label.types";

export const Label = ({ children, className }: LabelProps) => {
  return <div className={clsx("text-lg", className)}>{children}</div>;
};
