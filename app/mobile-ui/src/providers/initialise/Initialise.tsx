import * as React from "react";
import { isDesktop, uiLoadedSuccessfully } from "../../bridge";
import { InitialiseProviderProps, InitialiseContextValue } from "./Initialise.types";

export const InitialiseContext = React.createContext<null | InitialiseContextValue>(null);

export const InitialiseProvider = ({ children }: InitialiseProviderProps) => {
    const [isInitialised, setIsInitialised] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.receivedIsInitialised = () => setIsInitialised(true);
        uiLoadedSuccessfully();
        isDesktop() && window.receivedIsInitialised();
    }, [])

    return (
        <InitialiseContext.Provider
            value={{
                isInitialised,
            }}
        >
            {children}
        </InitialiseContext.Provider>
    );
};
