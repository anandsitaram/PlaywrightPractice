class DateUtils {

    /**
     * Gets the current date in the format DDMMYYHHSS (Day, Month, Year, Hours, Seconds).
     * @returns {string} The current date and time as a formatted string.
     */
    static getCurrentDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(currentDate.getFullYear()).slice(2); // Last two digits of the year
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        return `${day}${month}${year}${hours}${seconds}`;
    }

}

module.exports = DateUtils;