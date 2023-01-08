import * as React from "react";
import { NavigationContext } from "../Navigation";

export const useNavigation = () => {
  const ctx = React.useContext(NavigationContext);

  if (ctx == null) {
    throw new Error(
      "NavigationContext not found in hierarchy - but is required"
    );
  }

  return ctx;
};
