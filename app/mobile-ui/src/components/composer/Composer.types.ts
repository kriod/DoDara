import {
  ComponentType,
  JSXElementConstructor,
  PropsWithChildren,
  ReactNode,
} from "react";

type Component =
  | ComponentType
  | [JSXElementConstructor<PropsWithChildren<unknown>>, unknown];

export type ComposerProps = {
  children: ReactNode;
  components: Component[];
};
