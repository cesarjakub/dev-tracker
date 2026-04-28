import {formatTime} from "../utils/formatTime.js";
import Button from "./Button.jsx";
import {useEffect, useRef} from "react";
import ProgressRing from "./ProgressRing.jsx";
import "./TimerBeep.js"

const ProjectTimer = ({ isActive, time, totalTime, start, stop }) => {
    const beepRef = useRef(null);
    const wasActiveRef = useRef(false);

    useEffect(() => {
        if (wasActiveRef.current && !isActive) {
            beepRef.current?.beep();
        }
        wasActiveRef.current = isActive;
    }, [isActive]);

    return (
        <div className="project-timer">
            <ProgressRing seconds={isActive ? time : 0} isActive={isActive} />

            <p>Total: {formatTime(totalTime)}</p>

            {!isActive ? (
                <Button onClick={start} className="btn-primary">Start Session</Button>
            ) : (
                <Button onClick={stop} className="btn-danger">Stop Session</Button>
            )}

            <timer-beep ref={beepRef} frequency="800" duration="250"></timer-beep>
        </div>
    );
}

export default ProjectTimer;