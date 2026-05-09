/**
 * Converts a duration in seconds to a zero-padded `HH:MM:SS` string.
 *
 * @param {number} seconds - Total number of seconds (non-negative integer).
 * @returns {string} Time string in `HH:MM:SS` format.
 */
export const formatTime = (seconds) => {
    const totalSeconds = Math.max(0, Math.floor(Number(seconds) || 0));

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const addZero = (n) => n.toString().padStart(2, '0');
    return `${addZero(hrs)}:${addZero(mins)}:${addZero(secs)}`;
}