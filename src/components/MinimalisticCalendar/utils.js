export const getPrevNextFiveDates = ({
  currentDate,
  currentDay,
  daysInPreviousMonth,
}) => {
  return new Array(5).fill(null).map((date, index) => {
    let prevNextTwoDays = currentDay - 2 + index;
    let prevNextTwoDates = currentDate - 2 + index;

    if (prevNextTwoDates < 1) {
      prevNextTwoDates = daysInPreviousMonth + prevNextTwoDates;
    }

    let day = prevNextTwoDays;
    if (prevNextTwoDays > 6) {
      day = prevNextTwoDays - 7;
    } else if (prevNextTwoDays < 0) {
      day = 7 - -prevNextTwoDays;
    }

    return {
      date: prevNextTwoDates,
      day,
    };
  });
};
