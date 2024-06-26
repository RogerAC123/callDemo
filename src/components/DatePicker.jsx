import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

function DatePick({ selectedDate, onDateChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label="Fecha"
        views={["year", "month", "day"]}
        format={"DD-MM-YYYY"}
        value={selectedDate}
        onChange={onDateChange}
      />
    </LocalizationProvider>
  );
}

export default DatePick;
