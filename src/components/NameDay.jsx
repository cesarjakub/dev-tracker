import {useEffect, useState} from "react";
import {getNameDayInfo} from "../api/api.js";
import {months} from "../constants/months.js";

const NameDay = ({ collapsed }) => {
    const [data, setData] = useState(null);

    const onlineState = async () => {
        const res = await getNameDayInfo();
        setData(res);
    };

    const offlineState = () => setData(null);

    useEffect(() => {
        onlineState();

        window.addEventListener("online", onlineState);
        window.addEventListener("offline", offlineState);
        return () => {
            window.removeEventListener("online", onlineState)
            window.removeEventListener("offline", offlineState);
        };
    },[])

    if (!data) return <div className={`name-day-container loading ${collapsed ? "collapse" : ""}`}>Offline / Loading...</div>;

    return (
        <div className={`name-day-container ${collapsed ? "collapse" : ""}`}>
            <span className="date">{data.dayNumber}. {months[data.month.nominative]}</span>
            <span className="name-day">Name Day: {data.name}</span>
        </div>
    )
}

export default NameDay;