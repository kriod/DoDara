import { ReactNode } from "react";

export type ButtonProps = {
  className?: string;
  variant: "primary" | "secondary";
  children?: ReactNode;
  onClick: VoidFunction;
};
