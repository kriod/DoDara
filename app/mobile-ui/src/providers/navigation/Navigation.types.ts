import { CommonProviderProps, SupportedRoutes, WeekDayDto } from "../../dtos";

export type NavigationContextValue = {
  isNavigationBarVisible: boolean;
  previousRoute: SupportedRoutes;
  currentRoute: SupportedRoutes;
  toWelcomeView: VoidFunction;
  toHomeView: (day: WeekDayDto) => void;
  toExerciseView: VoidFunction;
  toExerciseResultView: (exerciseId: string, solutionId: string) => void;
  toSettingsView: VoidFunction;
  toLegalView: VoidFunction;
  toTermsAndConditions: VoidFunction;
  toDataPrivacy: VoidFunction;
};

export type NavigationProps = CommonProviderProps;
