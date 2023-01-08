import * as React from "react";
import { ResizProviderProps, ResizeContextValue } from "./Resize.types";

export const ResizeContext = React.createContext<ResizeContextValue | null>(
  null
);

export const ResizeProvider = ({ children }: ResizProviderProps) => {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = React.useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => window.removeEventListener("resize", handleResize, false);
  }, []);

  return (
    <ResizeContext.Provider
      value={{
        windowSize: windowSize,
      }}
    >
      {children}
    </ResizeContext.Provider>
  );
};
