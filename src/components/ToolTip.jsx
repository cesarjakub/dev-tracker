import {formatTime} from "../utils/formatTime.js";

const ToolTip = ({ active, payload, label }) => {
    const isVisible = active && payload && payload.length;
    return (
        <div className="chart-tooltip" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {isVisible && (
                <>
                    <p className="label">{label}</p>
                    <p className="value">{formatTime(payload[0].value)}</p>
                </>
            )}
        </div>
    );
};

export default ToolTip