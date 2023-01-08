import * as React from "react";

import { LegalContext } from "../Legal";

export const useLegal= () => {
  const ctx = React.useContext(LegalContext);

  if (ctx == null) {
    throw new Error("LegalContext not found in hierarchy - but is required");
  }

  return ctx;
};
