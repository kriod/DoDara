import { CommonProviderProps } from "../../dtos";

export type IdContextValue = {
  id: string;
  currentStars: string;
  setStars: (next: string) => void; 
  setId: (next: string, cb?: VoidFunction) => void;
};

export type IdProviderProps = CommonProviderProps;
