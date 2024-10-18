export const calculateDayDifference = (
  startDate: Date | undefined,
  endDate: Date | undefined
): number | null => {
  if (startDate && endDate) {
    const diffInTime = endDate.getTime() - startDate.getTime(); // Difference in milliseconds
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert to days
    return Math.ceil(diffInDays + 1); // Round up to nearest full day and + 1 to take in mind the start date
  }
  return null;
};
