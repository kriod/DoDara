import { useContext } from "react"
import { NetworkContext } from "../Network";

export const useNetwork = () => {
    const ctx = useContext(NetworkContext);

    if (ctx == null) {
        throw new Error("NetworkContextValue not found in hierarchy - but is required");
      }

    return ctx;
}