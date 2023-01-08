import clsx from "clsx";
import * as React from "react";

import { HiStar } from "react-icons/hi2";

import { useId } from "../../providers";
import { PointProps } from "./Stars.types";

export const Stars = ({ className }: PointProps) => {

  const {currentStars} = useId();

  return (
    <div
      className={clsx(
        "px-4 py-2 bg-emerald-400 text-lg rounded-2xl font-bold text-white flex flex-row justify-center items-center space-x-1 whitespace-nowrap overflow-hidden",
        className
      )}
    >
      <HiStar className="basis-6 h-6" />
      <div className="flex-1">{currentStars}</div>
    </div>
  );
};
