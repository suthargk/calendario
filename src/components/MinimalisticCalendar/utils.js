export const getPrevNextFiveDates = ({
  currentDate,
  currentDay,
  daysInPreviousMonth,
  daysInMonth,
}) => {
  return new Array(7).fill(null).map((_, index) => {
    let prevNextTwoDays = currentDay - 3 + index;
    let prevNextTwoDates = currentDate - 3 + index;

    let day = prevNextTwoDays;
    if (prevNextTwoDays > 6) {
      day = prevNextTwoDays - 7;
    } else if (prevNextTwoDays < 0) {
      day = 7 - -prevNextTwoDays;
    }

    if (prevNextTwoDates < 1) {
      prevNextTwoDates = daysInPreviousMonth + prevNextTwoDates;
      return {
        date: prevNextTwoDates,
        day,
        isCurrentMonthDate: false,
        isPrevMonthDate: true,
        isNextMonthDate: false,
      };
    }

    if (prevNextTwoDates > daysInMonth) {
      prevNextTwoDates = prevNextTwoDates - daysInMonth;
      return {
        date: prevNextTwoDates,
        day,
        isCurrentMonthDate: false,
        isPrevMonthDate: false,
        isNextMonthDate: true,
      };
    }

    return {
      date: prevNextTwoDates,
      day,
      isCurrentMonthDate: true,
      isPrevMonthDate: false,
      isNextMonthDate: false,
    };
  });
};
