export const addClass = (...args: string[]): string => {
  const unique: any = {};
  args.forEach((str) => {
    if (!str || !str.trim()) {
      return;
    }
    unique[String(str).trim()] = 1;
  });

  return Object.keys(unique).join(" ") || "";
};
export const makeClass = (...args: string[]): string => args.join("--");
