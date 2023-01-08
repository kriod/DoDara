import * as React from "react";
import { useNavigate } from "react-router-dom";

import { LegalContentType, SupportedRoutes, WeekDayDto } from "../../dtos";
import { useId } from "../id";
import { useLegal } from "../legal";
import { useNetwork } from "../network";
import { NavigationContextValue, NavigationProps } from "./Navigation.types";
import { extractRoute, navigationVisible } from "./utils";

export const NavigationContext =
  React.createContext<NavigationContextValue | null>(null);

export const NavigationProvider = ({ children }: NavigationProps) => {
  const navigate = useNavigate();
  const { id } = useId();
  const { setLegalContentType } = useLegal();


  const {
    onRequestExercise,
    onRequestExerciseHistory,
    onRequestStars,
    onSendExerciseResult,
    onEnsureId
  } = useNetwork();

  const [previous, setPrevious] = React.useState<SupportedRoutes>(extractRoute());
  const [current, setCurrent] = React.useState<SupportedRoutes>(extractRoute());
  const [isNavigationBarVisible, setNavigationBarVisible] =
    React.useState<boolean>(navigationVisible(current));

  const apply = React.useCallback(
    (route: SupportedRoutes) => () => {
      const isVisible = navigationVisible(route);
      setNavigationBarVisible(isVisible);
      setPrevious(current);
      setCurrent(route);
      navigate(route);
    },
    [navigate, current]
  );

  const navigateToWelcomeView = React.useCallback(() => {
    apply(SupportedRoutes.welcome)();
  }, [apply]);

  const navigateToHomeView = React.useCallback((day: WeekDayDto) => {
    onEnsureId().then((id: string) => {
      onRequestStars(id);
      onRequestExerciseHistory(day, id);
      apply(SupportedRoutes.home)();
    });
  }, [apply, onEnsureId, onRequestStars, onRequestExerciseHistory]);

  const navigateToExerciseView = React.useCallback(() => {
    onRequestExercise(id, apply(SupportedRoutes.exercise));
  }, [id, apply, onRequestExercise]);

  const navigateToLegal = React.useCallback(apply(SupportedRoutes.legal), [apply]);

  const navigateToSettingsView = React.useCallback(() => {
    apply(SupportedRoutes.settings)();
  }, [apply]);

  const navigateToTermsAndConditions = React.useCallback(() => {
    setLegalContentType(LegalContentType.TermsAndConditions);
    apply(SupportedRoutes.legalDetails)();
  }, [apply]);

  const navigateToDataPrivacy = React.useCallback(() => {
    setLegalContentType(LegalContentType.DataPrivacy);
    apply(SupportedRoutes.legalDetails)();
  }, [apply]);

  const navigateToExerciseResultView = React.useCallback((exerciseId: string, solutionId: string) => {
    onSendExerciseResult(exerciseId, solutionId, id, apply(SupportedRoutes.exerciseResult));
  }, [id, apply, onSendExerciseResult])

  return (
    <NavigationContext.Provider
      value={{
        previousRoute: previous,
        currentRoute: current,
        isNavigationBarVisible,
        toWelcomeView: navigateToWelcomeView,
        toLegalView: navigateToLegal,
        toHomeView: navigateToHomeView,
        toExerciseView: navigateToExerciseView,
        toExerciseResultView: navigateToExerciseResultView,
        toSettingsView: navigateToSettingsView,
        toTermsAndConditions: navigateToTermsAndConditions,
        toDataPrivacy: navigateToDataPrivacy,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
