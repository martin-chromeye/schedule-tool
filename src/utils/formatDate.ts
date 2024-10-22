export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB").replace(/\//g, ".");
};
