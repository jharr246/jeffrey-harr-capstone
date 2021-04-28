import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import calendarIcon from "../../assets/calendar.svg";
import "./CreateMeet.scss";
import ParkFinder from "../../Components/ParkFinder/ParkFinder";

export default function CreateMeet() {
  const [value, setValue] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);
  const [selectTime, setSelectedTime] = useState(null);

  let calendarHandler = (e) => {
    setCalendar(!calendar);
  };
  let targetHandler = (e) => {
    console.log(e.target.place_id);
  };

  console.log(selectTime);

  useEffect(() => {
    if (value) {
      const month = value.getMonth() + 1;
      const day = value.getDate();
      const year = value.getFullYear();
      setFormattedDate(`${month}/${day}/${year}`);
      console.log(year);
    }
  }, [value]);

  return (
    <>
      <div className="date__container">
        <p className="date__select">Select Date:</p>
        <img
          className="calendar__img"
          onClick={calendarHandler}
          src={calendarIcon}
          alt="calendar"
        />
        {value ? <p>{formattedDate}</p> : <></>}
      </div>
      {calendar ? (
        <div className="calendar__container">
          <Calendar onChange={setValue} value={value} />
        </div>
      ) : (
        <></>
      )}
      <div>
        <div className="time__container">
          <p className="time__select">Select Time:</p>
          <TimePicker onChange={setSelectedTime} value={selectTime} />
        </div>
      </div>
      <div>
        <ParkFinder parkSelect={targetHandler} />
      </div>
    </>
  );
}
