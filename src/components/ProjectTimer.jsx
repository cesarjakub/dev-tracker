import {formatTime} from "../utils/formatTime.js";
import Button from "./Button.jsx";

const ProjectTimer = ({ isActive, time, totalTime, start, stop }) => {
    return (
        <div className="project-timer">
            <p>Session: {formatTime(isActive ? time : 0)}</p>
            <p>Total: {formatTime(totalTime)}</p>

            {!isActive ? (
                <Button onClick={start} className="btn-primary">Start Session</Button>
            ) : (
                <Button onClick={stop} className="btn-danger">Stop Session</Button>
            )}
        </div>
    );
}

export default ProjectTimer;