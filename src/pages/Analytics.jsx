import PageHeader from "../components/PageHeader.jsx";
import {useProject} from "../hooks/useProject.js";
import {useAnalytics} from "../hooks/useAnalytics.js";
import {formatTime} from "../utils/formatTime.js";
import StatsCard from "../components/StatsCard.jsx";
import BarChart from "../components/BarChart.jsx";

const Analytics = () => {
    const { projects } = useProject();
    const { weeklyData, totalSeconds, lastProjectTitle} = useAnalytics(projects);

    return (
        <div className="analytics">
            <PageHeader>
                <h1>Analytics</h1>
            </PageHeader>
            <div className="analytics-wrapper">
                <div className="analytics-chart">
                    <BarChart data={weeklyData} />
                </div>

                <div className="analytics-stats">
                    <StatsCard value={formatTime(totalSeconds)} label="Total Time:" className="stats-primary"/>
                    <StatsCard value={lastProjectTitle} label="Last Edited:" className="stats-primary"/>
                </div>
            </div>
        </div>
    )
}

export default Analytics;