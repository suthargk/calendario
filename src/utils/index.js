const getRowDays = (rowIndex, firstDayOfMonth, daysInMonth) => {
  let arr = new Array(7).fill(0);
  const dayColumns = 7;

  if (rowIndex === 0) {
    arr = arr.map((a, i) =>
      i < firstDayOfMonth ? 0 : i + 1 - firstDayOfMonth
    );
  } else {
    const rowDayStartsWith =
      dayColumns - firstDayOfMonth + 1 + dayColumns * (rowIndex - 1);

    arr = arr.map((a, i) => {
      if (i + rowDayStartsWith > daysInMonth) return 0;
      return i + rowDayStartsWith;
    });
  }

  return arr;
};

export default getRowDays;
