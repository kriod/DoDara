import * as React from "react";
import { LoadingProviderProps, LoadingContextValue } from "./Loading.types";

export const LoadingContext = React.createContext<LoadingContextValue | null>(
  null
);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isGeneralLoading, setIsGeneralLoading] = React.useState<boolean>(false);
  const [isSectionLoading, setIsSectionLoading] =
    React.useState<boolean>(false);

  return (
    <LoadingContext.Provider
      value={{
        isGeneralLoading,
        setIsGeneralLoading,
        isSectionLoading,
        setIsSectionLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
