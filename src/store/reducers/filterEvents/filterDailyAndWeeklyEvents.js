export const filterDailyAndWeeklyEvents = ({
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference,
  eventStartAt,
  interval = 1,
}) => {
  if (recurrenceStatusList.hasOwnProperty("COUNT")) {
    if (recurrenceStatusList.hasOwnProperty("BYDAY")) {
      const occurrences = getWeeklyOccurences({
        startDate: eventStartAt,
        count: Number(recurrenceStatusList["COUNT"]),
        interval,
        recurrenceStatusList,
      });

      const endDate = occurrences[occurrences.length - 1];
      return userSelected <= endDate && endDate;
    }

    if (dateDifference < recurrenceStatusList["COUNT"] * interval) return event;
  } else if (
    recurrenceStatusList.hasOwnProperty("UNTIL") &&
    userSelected.getTime() <=
      new Date(
        recurrenceStatusList["UNTIL"]
          .split("T")[0]
          .replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")
      ).getTime()
  ) {
    return event;
  } else {
    return event;
  }
};
