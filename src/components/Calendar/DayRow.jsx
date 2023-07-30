import getRowDays from "../../utils";

const DayRow = ({ rowIndex, firstDayOfMonth, daysInMonth, year }) => {
  const days = getRowDays(rowIndex, firstDayOfMonth, daysInMonth);

  return (
    <tr className="border border-gray-700">
      {days?.map((a, index) => {
        return (
          <td className="text-center" key={index}>
            {a}
          </td>
        );
      })}
    </tr>
  );
};

export default DayRow;
