import clsx from "clsx";
import * as React from "react";

import { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  className,
  variant,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "text-lg p-4 rounded-3xl text-center outline-none",
        className,
        variant === "primary" ? "bg-sky-500 text-white" : "bg-transparent"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
