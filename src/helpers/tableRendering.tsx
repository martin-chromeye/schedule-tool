export const scheduleTableRender = (data: { [key: string]: string[] }) => {
  const inlineStyleTH = {
    backgroundColor: "#e11bb6",
    border: "1px solid black",
    color: "#ffffff",
  };

  const inlineStyleTD = {
    border: "1px solid black",
  };

  const titles = Object.keys(data);
  const times = Object.values(data);

  const renderTableHeaders = () => {
    return (
      <tr>
        {titles.map((title: string, index: number) => {
          return (
            <th key={`${index}-${title}`} style={inlineStyleTH}>
              {title}
            </th>
          );
        })}
      </tr>
    );
  };

  const renderTimesData = () => {
    const maxTimes = Math.max(...times.map((timeArray) => timeArray.length));

    return (
      <>
        {Array.from({ length: maxTimes }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {titles.map((title, colIndex) => {
              const time = times[colIndex][rowIndex];
              return (
                <td key={`${colIndex}-${rowIndex}`} style={inlineStyleTD}>
                  {time ? time : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  return { renderTableHeaders, renderTimesData };
};
