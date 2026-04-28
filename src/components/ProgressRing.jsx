import {useEffect, useRef} from "react";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MAX_SESSION = 3600;

const ProgressBar = ({ seconds, isActive }) => {
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (!circleRef.current || !textRef.current) return;

        const progress = Math.min(seconds / MAX_SESSION, 1);
        const offset = CIRCUMFERENCE * (1 - progress);

        circleRef.current.setAttribute("stroke-dashoffset", offset.toFixed(2));
        circleRef.current.setAttribute("stroke", isActive ? "#00B4D8" : "#e5e7eb");

        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        textRef.current.textContent = `${mins}:${secs}`;
    }, [seconds, isActive]);

    const handleClick = (e) => {
        const circle = circleRef.current;
        if (!circle) return;
        circle.setAttribute("Stroke", "#F59E0B");
        setTimeout(() => {
            circle.setAttribute("stroke", isActive ? "#00B4D8" : "#e5e7eb");
        }, 300);
    }

    return (
        <svg
            className = "svg-progress-ring"
            width = "130"
            height = "130"
            viewBox = "0 0 130 130"
            role = "img"
            aria-label = {`Session timer: ${seconds} seconds`}
            onClick={handleClick}
            style={{cursor: "pointer"}}
        >
            <title>Session Timer Progerss</title>

            <circle
                cx = "65"
                cy = "65"
                r = {RADIUS}
                fill = "none"
                stroke = "#e5e7eb"
                strokeWidth = "10"
            />

            <circle
                ref={circleRef}
                cx = "65"
                cy = "65"
                r = {RADIUS}
                fill = "none"
                stroke = "#e5e7eb"
                strokeWidth = "10"
                strokeLinecap = "round"
                strokeDasharray={CIRCUMFERENCE.toFixed(2)}
                strokeDashoffset={CIRCUMFERENCE.toFixed(2)}
                transform="rotate(-90 65 65)"
                style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease"}}
            />

            <text
                ref={textRef}
                x ="65"
                y ="65"
                textAnchor = "middle"
                dominantBaseline = "central"
                fontSize = "18"
                fontWeight = "600"
                fill = "#111827"
            >
                00:00
            </text>
        </svg>
    )
}

export default ProgressBar;