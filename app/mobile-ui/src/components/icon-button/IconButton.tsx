import clsx from "clsx";
import * as React from "react";

import { ButtonProps } from "./IconButton.types";

export const IconButton = ({
  children,
  className,
  colorClassName,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "w-20 h-20 flex justify-center items-center transition-all duration-300",
        colorClassName || "text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
