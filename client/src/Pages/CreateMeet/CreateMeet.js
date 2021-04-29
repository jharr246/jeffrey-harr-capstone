import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import calendarIcon from "../../assets/calendar.svg";
import "./CreateMeet.scss";
import ParkFinder from "../../Components/ParkFinder/ParkFinder";
import swal from "@sweetalert/with-react";

export default function CreateMeet() {
  const [value, setValue] = useState(null);
  const [calendar, setCalendar] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);
  const [selectTime, setSelectedTime] = useState(null);
  const [parkButton, setParkButton] = useState(false);
  const [parkName, setParkName] = useState("");
  const [parkAddress, setParkAddress] = useState("");

  let calendarHandler = (e) => {
    setCalendar(!calendar);
  };
  let targetHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.id);

    swal({
      title: e.target.name,
      text: e.target.id,
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((park) => {
      if (park) {
        setParkName(e.target.name);
        setParkAddress(e.target.id);
        swal("Park Selected");
      }
    });
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
    setParkButton(true);
    console.log(parkButton);
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

      {formattedDate && selectTime && !parkName && !parkAddress ? (
        <>
          <div>
            <div className="time__container">
              <p className="time__select">Park Name:</p>
              {!parkName ? <p>Use the ParkFinder!</p> : <p>{parkName}</p>}
            </div>
          </div>
          <div>
            <div className="time__container">
              <p className="time__select">Park Address:</p>
              {!parkAddress ? <p>Use the ParkFinder!</p> : <p>{parkAddress}</p>}
            </div>
          </div>
          <div>
            <ParkFinder parkSelect={targetHandler} parkButton={parkButton} />
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="time__container">
              <p className="time__select">Park Name:</p>
              <p>{parkName}</p>
            </div>
          </div>
          <div>
            <div className="time__container">
              <p className="time__select">Park Address:</p>
              <p>{parkAddress}</p>
            </div>
          </div>
        </>
      )}
      {formattedDate && selectTime && parkName && parkAddress ? (
        <div className="create-container">
          <button className="create-btn">Create Meet</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
