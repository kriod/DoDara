import { CommonProviderProps } from "../../dtos";

export type LoadingContextValue = {
  isGeneralLoading: boolean;
  isSectionLoading: boolean;
  setIsSectionLoading: (isLoading: boolean) => void;
  setIsGeneralLoading: (isLoading: boolean) => void;
};

export type LoadingProviderProps = CommonProviderProps;
