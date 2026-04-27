import {createContext, useContext, useEffect, useRef, useState} from "react";

/**
 * Context that holds the live session timer state.
 * Consume it via the {@link useSessionTimer} hook.
 */
const SessionTimerContext = createContext({
    isActive: false,
    time: 0,
    activeProjectId: null,
    start: () => {},
    stop: () => 0
});

/**
 * Provides the session timer to the component tree.
 * Mounts a 1-second interval while a session is active and cleans it up on pause/unmount.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
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

    /**
     * Starts a new timer session for the given project.
     * Resets elapsed time to zero and records the start timestamp.
     *
     * @param {number} projectId - The id of the project to start tracking.
     */
    const start = (projectId) => {
        startRef.current = Date.now();
        setActiveProjectId(projectId);
        setTime(0);
        setIsActive(true);
    };

    /**
     * Stops the active session and returns the elapsed duration.
     *
     * @returns {number} The final elapsed time in seconds.
     */
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

/**
 * Convenience hook for consuming {@link SessionTimerContext}.
 */
export const useSessionTimer = () => useContext(SessionTimerContext);
