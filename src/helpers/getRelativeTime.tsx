// utils/getRelativeTime.ts
export const getRelativeTime = (timestamp: string): string => {
    const now = new Date();
    const blockTime = new Date(timestamp);
    const timeDifference = now.getTime() - blockTime.getTime(); // Difference in milliseconds

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