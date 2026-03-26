export const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const addZero = (n) => n.toString().padStart(2, '0');
    return `${addZero(hrs)}:${addZero(mins)}:${addZero(secs)}`;
}