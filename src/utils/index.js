export const getRowDates = (
  rowIndex,
  firstDayOfMonth,
  daysInMonth,
  daysInPreviousMonth
) => {
  let arr = new Array(7).fill(0);
  const dayColumns = 7;

  if (rowIndex === 0) {
    arr = arr.map((_, i) =>
      i < firstDayOfMonth
        ? {
            date: daysInPreviousMonth + 1 + i - firstDayOfMonth,
            prevMonthDate: true,
            nextMonthDate: false,
            currentMonthDate: false,
          }
        : {
            date: i + 1 - firstDayOfMonth,
            prevMonthDate: false,
            nextMonthDate: false,
            currentMonthDate: true,
          }
    );
  } else {
    const rowDayStartsWith =
      dayColumns - firstDayOfMonth + 1 + dayColumns * (rowIndex - 1);

    arr = arr.map((_, i) => {
      if (i + rowDayStartsWith > daysInMonth)
        return {
          date: i + rowDayStartsWith - daysInMonth,
          nextMonthDate: true,
          prevMonthDate: false,
          currentMonthDate: false,
        };
      return {
        date: i + rowDayStartsWith,
        nextMonthDate: false,
        prevMonthDate: false,
        currentMonthDate: true,
      };
    });
  }

  return arr;
};

export const getNextMonthDate = (nextMonth, year) => {
  return {
    nextMonth: nextMonth > 11 ? 0 : nextMonth,
    nextYear: nextMonth > 11 ? year + 1 : year,
  };
};

export const getPrevMonthDate = (prevMonth, year) => {
  return {
    prevMonth: prevMonth < 0 ? 11 : prevMonth,
    prevYear: prevMonth < 0 ? year - 1 : year,
  };
};
