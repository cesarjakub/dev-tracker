/**
 * Converts a duration in seconds to a zero-padded `HH:MM:SS` string.
 *
 * @param {number} seconds - Total number of seconds (non-negative integer).
 * @returns {string} Time string in `HH:MM:SS` format.
 */
export const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const addZero = (n) => n.toString().padStart(2, '0');
    return `${addZero(hrs)}:${addZero(mins)}:${addZero(secs)}`;
}