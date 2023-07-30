const DayRow = ({ index, firstDayOfMonth, daysInMonth }) => {
  let arr = new Array(7).fill(0);
  const dayColumns = 7;

  if (index === 0) {
    arr = arr.map((a, i) =>
      i < firstDayOfMonth ? 0 : i + 1 - firstDayOfMonth
    );
  } else {
    const rowDayStartsWith =
      dayColumns - firstDayOfMonth + 1 + dayColumns * (index - 1);

    arr = arr.map((a, i) => {
      if (i + rowDayStartsWith > daysInMonth) return 0;
      return i + rowDayStartsWith;
    });
  }

  return (
    <tr className="border border-gray-700">
      {arr?.map((a, index) => {
        return <td key={index}>{a}</td>;
      })}
    </tr>
  );
};

export default DayRow;
