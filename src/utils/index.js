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
        ? daysInPreviousMonth + 1 + i - firstDayOfMonth
        : i + 1 - firstDayOfMonth
    );
  } else {
    const rowDayStartsWith =
      dayColumns - firstDayOfMonth + 1 + dayColumns * (rowIndex - 1);

    arr = arr.map((_, i) => {
      if (i + rowDayStartsWith > daysInMonth)
        return i + rowDayStartsWith - daysInMonth;
      return i + rowDayStartsWith;
    });
  }

  return arr;
};

export default getRowDays;
