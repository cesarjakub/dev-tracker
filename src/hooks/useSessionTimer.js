import {useEffect, useRef, useState} from "react";

export const useSessionTimer = (onEnd) => {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const startRef = useRef(null);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setTime(Math.floor((Date.now() - startRef.current) / 1000));
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const start = () => {
        startRef.current = Date.now();
        setTime(0);
        setIsActive(true);
    };

    const stop = () => {
        const duration = Math.floor((Date.now() - startRef.current) / 1000);
        setIsActive(false);
        onEnd(duration);
    };

    return { isActive, time, start, stop };
};