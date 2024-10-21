export const isSorted = (timesForDay: string[]) => {
  // Compare each time with the next one to ensure sorted order
  for (let i = 0; i < timesForDay.length - 1; i++) {
    if (timesForDay[i] > timesForDay[i + 1]) {
      return false;
    }
  }
  return true;
};
