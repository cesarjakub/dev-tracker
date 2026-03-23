const StatsCard = ({ label, value, className = ""}) => {
    return (
        <div className={`stats-card ${className}`}>
            <span className="stats-label">{label}</span>
            <span className="stats-value">{value}</span>
        </div>
    )
}

export default StatsCard;