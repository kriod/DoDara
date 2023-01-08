import React from "react";

import { useOverview } from "../../overview";
import { useNavigation } from "./useNavigation";

export const useNavigateToHome = (): VoidFunction => {
  const { selectedWeekDay } = useOverview();
  const { toHomeView } = useNavigation();

  const handler = React.useCallback(() => {
    toHomeView(selectedWeekDay);
  }, [selectedWeekDay, toHomeView]);

  return handler;
};