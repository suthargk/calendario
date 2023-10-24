export const getUserSelectedDate = (state) => {
  const { year, month, date } = state.calendar;
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(
    2,
    "0"
  )}`;
};
