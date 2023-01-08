import { CommonProviderProps, SizeDto } from "../../dtos";

export type ResizProviderProps = CommonProviderProps;

export type ResizeContextValue = {
  windowSize: SizeDto;
};
