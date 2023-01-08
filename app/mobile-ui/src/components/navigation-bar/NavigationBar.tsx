import clsx from "clsx";
import * as React from "react";

import {
  HiQrCode,
  HiAcademicCap,
  HiXMark,
  HiPlay
} from "react-icons/hi2";

import { SupportedRoutes } from "../../dtos";
import { useNavigateToHome, useNavigation} from "../../providers";
import { IconButton } from "../icon-button";

import { NavigationBarProps } from "./NavigationBar.types";

export const NavigationBar = ({ className, isVisible }: NavigationBarProps) => {
  const { currentRoute, toSettingsView, toExerciseView } =
    useNavigation();

  const toHomeView = useNavigateToHome();

  const getTabIconColor = React.useCallback(
    (route: SupportedRoutes) =>
      route === currentRoute ? "text-sky-500" : "text-slate-400",
    [currentRoute]
  );

  const getButtonColor = React.useCallback(
    () =>
      currentRoute === SupportedRoutes.exercise ? "bg-red-500" : "bg-sky-500",
    [currentRoute]
  ); 

  const handleExerciseButton = React.useCallback(() => {
    currentRoute === SupportedRoutes.exercise ?  toHomeView() : toExerciseView();
  }, [currentRoute, toHomeView, toExerciseView]);

  return (
    <div
      className={clsx(
        "absolute h-16 bottom-0 left-0 right-0 bg-white transition-transform duration-500 rounded-t-2xl",
        isVisible ? "translate-y-0" : "translate-y-40",
        className
      )}
    >
      <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-row justify-center items-center">
        <div className="flex-1 text-center">
          <IconButton
            className="mx-auto"
            colorClassName={getTabIconColor(SupportedRoutes.home)}
            onClick={toHomeView}
          >
            <HiAcademicCap className="w-8 h-8" />
          </IconButton>
        </div>
        <div className="flex-1 text-center">
          <IconButton
            className="mx-auto"
            colorClassName={getTabIconColor(SupportedRoutes.settings)}
            onClick={toSettingsView}
          >
            <HiQrCode className="w-8 h-8 mx-auto" />
          </IconButton>
        </div>
      </div>
      <IconButton
        className={clsx(
          "fixed left-1/2 -ml-10 -mt-10 border-8 border-slate-100 rounded-full mx-auto",
          getButtonColor()
        )}
        onClick={handleExerciseButton}
      >
        {currentRoute === SupportedRoutes.exercise ? (
          <HiXMark className="w-8 h-8" />
        ) : (
          <HiPlay className="w-8 h-8" />
        )}
      </IconButton>
    </div>
  );
};
