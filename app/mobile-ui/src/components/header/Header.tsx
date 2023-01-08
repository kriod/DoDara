import React from "react";
import { HeaderLabel } from "../header-label";
import { Label } from "../label";
import { Stars } from "../stars";
import { HeaderProps } from "./Header.types";

export const Header = ({ title, meta, showStars }: HeaderProps) => {
  return (
    <div className="relative flex flex-row gap-2">
      <div className="flex-1">
        <Label className="text-slate-400">{meta}</Label>
        <HeaderLabel className="mt-2">{title}</HeaderLabel>
      </div>
      <div className="mt-9">
        {showStars && <Stars className="" />}
      </div>
    </div>
  );
};
