import clsx from "clsx";
import * as React from "react";

import { HeaderLabelProps } from "./HeaderLabel.types";

export const HeaderLabel = ({ children, className }: HeaderLabelProps) => {
  return (
    <div className={clsx("text-4xl font-bold mb-4", className)}>{children}</div>
  );
};
