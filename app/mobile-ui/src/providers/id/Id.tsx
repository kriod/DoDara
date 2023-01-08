import * as React from "react";
import { useStateDidUpdate } from "../network";
import { IdProviderProps, IdContextValue } from "./Id.types";

export const IdContext = React.createContext<IdContextValue | null>(null);

export const IdProvider = ({ children }: IdProviderProps) => {
  const [id, setId] = useStateDidUpdate<string | null>(null);
  const [currentStars, setStars] = React.useState("-");

  React.useEffect(() => {
    window.receivedId = (next: string) => setId(next);
  }, [setId])

  return (
    <IdContext.Provider
      value={{
        id,
        currentStars,
        setStars,
        setId,
      }}
    >
      {children}
    </IdContext.Provider>
  );
};
