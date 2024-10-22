import { createFilteredCopy, Times } from "./createFilteredCopy";

export const getTemplateOrCopyStatus = (
  dateKey: string,
  times: Times,
  hoveredTimes: Times | null
) => {
  // Create a filtered copy of hoveredTimes that excludes matching entries in times
  const filteredHoveredTimes = createFilteredCopy(times, hoveredTimes);

  const isTemplate = times[dateKey] && times[dateKey].length > 0;
  const isCopy =
    filteredHoveredTimes &&
    filteredHoveredTimes[dateKey] &&
    filteredHoveredTimes[dateKey].length > 0;

  if (isCopy) {
    return "copy";
  } else if (isTemplate) {
    return "template";
  }
};
