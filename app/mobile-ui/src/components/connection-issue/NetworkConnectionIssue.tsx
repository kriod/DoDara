import clsx from "clsx";
import * as React from "react";

import { useNetwork } from "../../providers";
import { Label } from "../../components";

import { HiWifi } from "react-icons/hi2";
import { AiFillCloseCircle } from "react-icons/ai";

export const NetworkConnectionIssue = () => {
    const { hasNetwork, setHasNetwork } = useNetwork();

    const handleClose = React.useCallback(() => {
        setHasNetwork(true);
    }, []);

    return <div className={clsx("fixed top-0 bottom-0 left-0 right-0 transition-opacity duration-300 bg-slate-800 bg-opacity-80 flex justify-center items-center", hasNetwork ? "opacity-0 pointer-events-none" : "opacity-100")} onClick={handleClose}>
        <div className="relative bg-slate-100 rounded-2xl w-72 p-6 text-center space-y-4">
            <AiFillCloseCircle className="w-8 h-8 absolute right-2 top-2 text-sky-500" />
            <HiWifi className="w-16 h-16 text-slate-300 rounded-2xl mx-auto" />
            <Label className="text-center text-sm font-bold text-slate-400">
                There seems to be an issue with your internet connection. Please ensure you are connected to the internet.
            </Label>
        </div>
    </div>
}