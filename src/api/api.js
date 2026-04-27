/**
 * Fetches today's name day information from the svatkyapi service.
 * Returns `null` if the browser is offline or if the request fails.
 *
 * @async
 * @returns {Promise<NameDayInfo|null>} The name day data, or `null` on failure or when offline.
 *
 */
export const getNameDayInfo = async () => {
    if (!window.navigator.onLine) return null;

    try{
        const res = await fetch("https://svatkyapi.netlify.app/api/day");
        if (!res.ok) throw new Error(`ERROR: ${res.status}`);
        return res.json();
    }catch(err){
        console.log("API Error:", err.message);
        return null;
    }
}