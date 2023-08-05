const getRowDays = (
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
            day: daysInPreviousMonth + 1 + i - firstDayOfMonth,
            prevMonthDay: true,
            nextMonthDay: false,
            currentMonthDay: false,
          }
        : {
            day: i + 1 - firstDayOfMonth,
            prevMonthDay: false,
            nextMonthDay: false,
            currentMonthDay: true,
          }
    );
  } else {
    const rowDayStartsWith =
      dayColumns - firstDayOfMonth + 1 + dayColumns * (rowIndex - 1);

    arr = arr.map((_, i) => {
      if (i + rowDayStartsWith > daysInMonth)
        return {
          day: i + rowDayStartsWith - daysInMonth,
          nextMonthDay: true,
          prevMonthDay: false,
          currentMonthDay: false,
        };
      return {
        day: i + rowDayStartsWith,
        nextMonthDay: false,
        prevMonthDay: false,
        currentMonthDay: true,
      };
    });
  }

  return arr;
};

export default getRowDays;
