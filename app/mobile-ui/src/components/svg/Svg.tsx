import clsx from "clsx";
import * as React from "react";

import { SvgProps } from "./Svg.types";

export const SvgComponent = ({ className, src }: SvgProps) => {
  return (
    <div className={clsx("flex justify-content items-center", className)}>
      <img src={src} />
    </div>
  );
};
