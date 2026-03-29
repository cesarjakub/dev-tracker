import {createContext, useContext, useEffect, useRef, useState} from "react";

const SessionTimerContext = createContext({
    isActive: false,
    time: 0,
    activeProjectId: null,
    start: () => {},
    stop: () => 0
});

export const SessionTimerProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [activeProjectId, setActiveProjectId] = useState(null);
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

    const start = (projectId) => {
        startRef.current = Date.now();
        setActiveProjectId(projectId);
        setTime(0);
        setIsActive(true);
    };

    const stop = () => {
        const finalTime = time;
        setIsActive(false);
        setActiveProjectId(null);
        setTime(0);
        return finalTime;
    };

    return (
        <SessionTimerContext.Provider value={{ isActive, time, activeProjectId, start, stop }}>
            {children}
        </SessionTimerContext.Provider>
    );
}

export const useSessionTimer = () => useContext(SessionTimerContext);
