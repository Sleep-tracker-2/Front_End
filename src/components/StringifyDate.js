/** Format a given Date to a string representation based on a format string.
 * Based on the PHP "date" function.
 * Not supported: Week-numbering, Swatch Time, microseconds, Timezones, Full Date/Time.
 *
 * @param {Date} date A Date object
 * @param {string} formatString A string specifing the format of the output.
 * See https://www.php.net/manual/en/function.date.php for details on recognized characters.
 * @returns {string} A string representing the date/time.
 */
export default function stringifyDate(date, formatString) {
    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return Array.from(formatString)
        .map(char => {
            switch (char) {
                case "d":
                    return date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
                case "D":
                    return dayNames[date.getDay()].slice(0, 3);
                case "j":
                    return date.getDate();
                case "l":
                    return dayNames[date.getDay()];
                case "N":
                    return date.getDay() === 0 ? 7 : date.getDay();
                case "S":
                    const day = date.getDate();
                    if (day === 1) return "st";
                    if (day === 2) return "nd";
                    if (day === 3) return "rd";
                    return "th";
                case "w":
                    return date.getDay();
                case "z":
                    return (
                        Math.floor(
                            (date - new Date(date.getFullYear(), 0, 0)) /
                            (1000 * 60 * 60 * 24)
                        ) - 1
                    );
                case "W":
                    return "W"; //: Week number not supported";
                case "F":
                    return monthNames[date.getMonth()];
                case "m":
                    return date.getMonth() + 1 >= 10
                        ? date.getMonth() + 1
                        : "0" + (date.getMonth() + 1);
                case "M":
                    return monthNames[date.getMonth()].slice(0, 3);
                case "n":
                    return date.getMonth() + 1;
                case "t":
                    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                case "L":
                    const year = date.getFullYear();
                    if (year % 4 !== 0) return 0;
                    if (year % 400 === 0) return 1;
                    if (year % 100 === 0) return 0;
                    return 1;
                case "o":
                    return "o"; //: Week-numbered year not supported";
                case "Y":
                    return date.getFullYear();
                case "y":
                    return date
                        .getFullYear()
                        .toString()
                        .slice(2);
                case "a":
                    return date.getHours() < 12 ? "am" : "pm";
                case "A":
                    return date.getHours() < 12 ? "AM" : "PM";
                case "B":
                    return "B"; //: Swatch internet time not supported";
                case "g":
                    return date.getHours() === 0 ? 12 : date.getHours() % 12;
                case "G":
                    return date.getHours();
                case "h":
                    const hour = date.getHours();
                    if (hour === 0) return 12;
                    return hour % 12 < 10 ? "0" + (hour % 12).toString() : hour % 12;
                case "H":
                    return date.getHours() < 10
                        ? "0" + date.getHours().toString()
                        : date.getHours();
                case "i":
                    return date.getMinutes() < 10
                        ? "0" + date.getMinutes().toString()
                        : date.getMinutes();
                case "s":
                    return date.getSeconds() < 10
                        ? "0" + date.getSeconds().toString()
                        : date.getSeconds();
                case "u":
                    return "u"; //: Microseconds not supported";
                case "v":
                    return date.getMilliseconds();
                case "e":
                    return "e"; //: Timezone not supported";
                case "I":
                    return "I"; //: Timezone not supported";
                case "O":
                    return "O"; //: Timezone not supported";
                case "P":
                    return "P"; //: Timezone not supported";
                case "T":
                    return "T"; //: Timezone not supported";
                case "Z":
                    return "Z"; //: Timezone not supported";
                case "c":
                    return "c"; //: Full date strings not supported";
                case "r":
                    return "r"; //: Full date strings not supported";
                case "U":
                    return date.getTime();
                default:
                    return char;
            }
        })
        .reduce((ac, val) => ac + val.toString(), "");
}
