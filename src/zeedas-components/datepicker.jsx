import React, { useState } from "react";
import DatePicker from "react-datepicker";

const ZeedasDatepicker = ({ className }) => {
  const [date, setDate] = useState(new Date());
  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
      showYearDropdown
      showMonthDropdown
      className={className}
      useShortMonthInDropdown
      popperClassName="zeedas-datepicker"
    />
  );
};

export default ZeedasDatepicker;
