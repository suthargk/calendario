import getRowDays from "../../utils";

const DayRow = ({
  rowIndex,
  firstDayOfMonth,
  daysInMonth,
  year,
  date,
  month,
}) => {
  const days = getRowDays(rowIndex, firstDayOfMonth, daysInMonth);
  const handleDaySelect = (dateValue) => {
    console.log(year, month, dateValue);
  };
  return (
    <tr className="border border-gray-700">
      {days?.map((a, index) => {
        return (
          <td
            className="text-center"
            onClick={() => handleDaySelect(a)}
            key={index}
          >
            {a}
          </td>
        );
      })}
    </tr>
  );
};

export default DayRow;
