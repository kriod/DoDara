import * as React from "react";

import { ComposerProps } from "./Composer.types";

export const Composer = ({ components, children }: ComposerProps) => (
  <>
    {components.reduceRight((acc, curr) => {
      const [Component, props] = Array.isArray(curr)
        ? [curr[0], curr[1]]
        : [curr, {}];
      return <Component {...(props as object)}>{acc}</Component>;
    }, children)}
  </>
);
