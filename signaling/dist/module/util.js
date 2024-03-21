export class Util {
    static unixTimestampToISO8601(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        return date.toISOString();
    }
}
