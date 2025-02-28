// utils/getRelativeTime.ts
export const getRelativeTime = (unixTimestamp: string): string => {
    const now = Date.now(); // Current time in milliseconds
    const blockTime = Number(unixTimestamp) * 1000; // Convert Unix timestamp to milliseconds
    const timeDifference = now - blockTime; // Difference in milliseconds

    // Convert time difference to seconds, minutes, hours, etc.
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
        return `${seconds} sec ago`;
    } else if (minutes < 60) {
        return `${minutes} min ago`;
    } else {
        return `${hours} hr ago`;
    }
};