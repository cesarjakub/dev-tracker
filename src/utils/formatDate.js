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