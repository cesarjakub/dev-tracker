export const getNameDayInfo = async () => {
    if (!window.navigator.onLine) return null;

    try{
        const res = await fetch("https://svatkyapi.netlify.app/api/day");
        if (!res.ok) throw new Error(`ERROR: ${res.status}`);
        return res.json();
    }catch(err){
        console.log("API Error brácho:", err.message);
        return null;
    }
}