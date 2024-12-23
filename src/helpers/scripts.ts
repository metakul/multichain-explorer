export const truncateValue = (value: string | number | undefined): string => {
    if (!value) return "-";
    const stringValue = String(value);
    if (stringValue.length <= 20) return stringValue;
    return `${stringValue.slice(0, 6)}....${stringValue.slice(-6)}`;
};