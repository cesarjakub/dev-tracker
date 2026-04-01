import {BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import ToolTip from "./ToolTip";

const BarChart = ({ data }) => {
    return (
        <div className="bar-chart-container" style={{ width: '100%', height: '350px', minHeight: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBar
                    data={data}
                    margin={{ top: 20, right: 10, left: 20, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f0f0f0"
                    />

                    <XAxis
                        dataKey="dayName"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        dy={10}
                    />

                    <YAxis hide/>

                    <Tooltip
                        content={<ToolTip />}
                        cursor={{ fill: 'rgba(0, 180, 216, 0.05)' }}
                    />

                    <Bar
                        dataKey="seconds"
                        fill="#00B4D8"
                        radius={[4, 4, 0, 0]}
                        barSize={32}
                        animationDuration={1000}
                    />
                </RechartsBar>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart