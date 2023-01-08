import { ReactNode } from "react";

export type ButtonProps = {
  className?: string;
  colorClassName?: string;
  children?: ReactNode;
  onClick: VoidFunction;
};
