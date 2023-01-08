import { useEffect, useRef, useState, useCallback } from "react"

export const useStateDidUpdate = <T>(initialState: T): [
    T, (next: T, onComplete?: VoidFunction) => void,
] => {
    const ref = useRef<T>();

    const [state, setState] = useState<T>(initialState);

    const [onComplete, setOnComplete] = useState<VoidFunction>(() => undefined);

    const setNextState = useCallback((next: T, onComplete?: VoidFunction) => {
        setOnComplete(onComplete);
        setState(next);
    }, []);

    useEffect(() => {
        if (ref.current === state) {
            return;
        }

        ref.current = state;
        onComplete && onComplete();
    }, [ref, state, onComplete]);

    return [state, setNextState];
}