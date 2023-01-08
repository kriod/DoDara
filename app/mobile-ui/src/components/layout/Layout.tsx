import clsx from "clsx";
import * as React from "react";
import { useLoading, useNavigation } from "../../providers";
import { NetworkConnectionIssue } from "../connection-issue/NetworkConnectionIssue";
import { Loader } from "../loader";
import { NavigationBar } from "../navigation-bar";

import { LayoutProps } from "./Layout.types";

export const Layout = (props: LayoutProps) => {
  const { isNavigationBarVisible } = useNavigation();
  const { isGeneralLoading: isLoading } = useLoading();

  const { children, className } = props;

  return (
    <div
      className={clsx(
        "relative w-full h-full flex justify-center",
        className,
        isNavigationBarVisible ? "pt-8 px-8 pb-28" : "p-8"
      )}
    >
      <div className="w-full h-full  max-w-lg flex flex-col space-y-4">
        {children}
      </div>

      <Loader isVisible={isLoading} />
      <NavigationBar
        className="max-w-lg mx-auto"
        isVisible={isNavigationBarVisible}
      />
      <NetworkConnectionIssue/>
    </div>
  );
};
