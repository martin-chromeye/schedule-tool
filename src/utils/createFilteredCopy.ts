export type Times = { [key: string]: string[] };

export const createFilteredCopy = (
  first: Times,
  second: Times | null
): Times => {
  const filteredCopy: Times = {};

  if (!second) return filteredCopy;

  for (const key in second) {
    // If the key exists in the first object and their values are the same, skip adding it to the filtered copy
    if (
      !(
        first[key] && JSON.stringify(first[key]) === JSON.stringify(second[key])
      )
    ) {
      filteredCopy[key] = second[key];
    }
  }

  return filteredCopy;
};
