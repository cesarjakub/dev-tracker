import {useMemo} from "react";

export const useAnalytics = (projects) => {
    return useMemo(() => {
        if (!projects || projects.length === 0) {
            return { weeklyData: [], totalHours: "0.0", lastProjectTitle: "None", dailyPeak: 0 };
        }

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const graphVals = [];

        const getLocalDateString = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const now = new Date();
        const dayNum = now.getDay();
        const diffToMonday = (dayNum === 0 ? 6 : dayNum - 1);

        const monday = new Date(now);
        monday.setDate(now.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);

        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            graphVals.push({
                dayName: days[i],
                dateStr: getLocalDateString(d),
                seconds: 0
            });
        }

        let totalSeconds = 0;
        let latestProject = projects[0];

        projects.forEach(p => {
            totalSeconds += (p.totalTime || 0);

            if (p.lastEdited && new Date(p.lastEdited) > new Date(latestProject.lastEdited)) {
                latestProject = p;
            }

            p.sessions?.forEach(s => {
                const sessionDateStr = new Date(s.date).toISOString().split('T')[0];
                const dayMatch = graphVals.find(d => d.dateStr === sessionDateStr);
                if (dayMatch) {
                    dayMatch.seconds += s.time;
                }
            });
        });

        return {
            weeklyData: graphVals,
            totalSeconds: totalSeconds,
            lastProjectTitle: latestProject.title,
        };

    }, [projects]);
}