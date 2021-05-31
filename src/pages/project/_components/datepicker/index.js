import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

export const DatePicker = styled(ReactDatePicker)
  .attrs((props) => ({
    onChange: (date) => props.onDateChange(props.name, date),
    // filterDate: (date) => date.getTime() > Date.now() || Date.now(),
    timeFormat: "p",
    timeIntervals: 15,
    dateFormat: "MMM d",
    dayClassName: (date) => date.getTime() === new Date().getTime() ? "disabled-date" : "",
    minDate: new Date(),
    showDisabledMonthNavigation: true,
  }))`
      outline: none;
      border: none;
      & .disabled-date {
        color: red !important;
      }
    `;
