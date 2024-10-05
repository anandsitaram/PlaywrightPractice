class RandomUtils {

    /**
     * Generates a random alphanumeric string (containing letters and numbers) of the given length.
     * @param {number} length - The desired length of the generated string.
     * @returns {string} A random alphanumeric string of the specified length.
     */
    static getRandomAlphaNumericString(length) {
        let result = '';
        while (result.length < length) {
            result += Math.random().toString(36).slice(2);
        }
        return result.substring(0, length);
    }

    /**
     * Generates a random camelCase string where the first character is uppercase and the rest are lowercase.
     * @param {number} length - The desired length of the generated string.
     * @returns {string} A random camelCase string of the specified length.
     */
    static getRandomCamelCaseString(length) {
        if (length <= 0) {
            return '';
        }
        let result = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 1; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    /**
     * Generates a random lowercase alphabetic string of the given length.
     * @param {number} length - The desired length of the generated string.
     * @returns {string} A random lowercase alphabetic string of the specified length.
     */
    static getRandomLowerCaseString(length) {
        if (length <= 0) {
            return '';
        }
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

      /**
     * Generates a random numeric value (digits only) of the given length.
     * @param {number} length - The desired length of the generated number.
     * @returns {number} A random numeric value of the specified length.
     */
      static getRandomNumber(length) {
        let result = '';
        while (result.length < length) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return Number(result.substring(0, length));
    }

}

module.exports = RandomUtils;
