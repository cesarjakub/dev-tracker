/**
 * Formats a date value as a Czech-locale date string (`DD.MM.YYYY`).
 * Uses the `Europe/Prague` time zone so dates stored as UTC are displayed
 * in local Prague time regardless of where the browser is running.
 *
 * @param {Date|string|number} date - Any value accepted by the `Date` constructor.
 * @returns {string} Formatted date string, e.g. `"22.04.2026"`, or an empty string when `date` is falsy.
 */
const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("cs-CZ", {
        timeZone: "Europe/Prague",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).replace(/\s/g, "");
}

export default formatDate;