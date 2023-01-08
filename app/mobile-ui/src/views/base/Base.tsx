import * as React from "react";
import { useId, useInitialise, useNavigateToHome } from "../../providers";
import { WelcomeView } from "../welcome";

export const BaseView = () => {
  const { id } = useId();
  const { isInitialised } = useInitialise();
  const toHomeView = useNavigateToHome();

  React.useEffect(() => {
    id && toHomeView();
  }, [id, toHomeView]);

  return isInitialised && id == null ? <WelcomeView /> : null;
};
