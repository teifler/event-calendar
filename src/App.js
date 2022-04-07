import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import './styles.css';

function App() {
  const [date, setDate] = useState(new Date());
  const dateFns = require('date-fns');

  const startOfMonth = dateFns.startOfMonth(date);

  //Weekdays start at 0 on sunday and end with 6 on Saturday
  const sunday = 0;
  const monday = 1;
  const tuesday = 2;
  const wednesday = 3;
  const thursday = 4;
  const friday = 5;
  const saturday = 6;

  //Function to find first (weekday) in a month (friday for example)
  const weekDayFinder = weekday => {
    return dateFns.setDay(startOfMonth, weekday, {
      weekStartsOn: dateFns.getDay(startOfMonth),
    });
  };

  //Takes first weekday of a month and add weeks to it and returns that date
  const addWeeks = (firstWeek, addWeeksToDate) => {
    return dateFns.addWeeks(firstWeek, addWeeksToDate);
  };

  //recycling center (every wednesday)
  const firstWednesdayRecycling = weekDayFinder(wednesday);
  const secoundWednesdayRecycling = addWeeks(firstWednesdayRecycling, 1);
  const thirdWednesdayRecycling = addWeeks(firstWednesdayRecycling, 2);
  const fourthWednesdayRecycling = addWeeks(firstWednesdayRecycling, 3);

  const recylingDates = [
    firstWednesdayRecycling,
    secoundWednesdayRecycling,
    thirdWednesdayRecycling,
    fourthWednesdayRecycling,
  ];

  //Papertrash twice a month
  const firstPaperTrash = weekDayFinder(wednesday);
  const secondPaperTrash = weekDayFinder(monday);
  const thirdPaperTrash = addWeeks(secondPaperTrash, 2);

  const paperTrashDates = [firstPaperTrash, secondPaperTrash, thirdPaperTrash];

  //Plastictrash
  const firstPlasticTrash = weekDayFinder(friday);
  const secondPlasticTrash = weekDayFinder(wednesday);
  const thirdPlasticTrash = addWeeks(firstPlasticTrash, 3);

  const plasticTrashDates = [
    firstPlasticTrash,
    secondPlasticTrash,
    thirdPlasticTrash,
  ];

  const onChange = date => {
    setDate(date);
  };

  function isSameDay(eventDates, date) {
    return differenceInCalendarDays(eventDates, date) === 0;
  }

  function tileClassName({ date, view }) {
    const output = [];
    if (
      view === 'month' &&
      recylingDates.find(recylingDate => isSameDay(recylingDate, date))
    ) {
      output.push('positionRel');
    }

    if (
      view === 'month' &&
      paperTrashDates.find(eventDate => isSameDay(eventDate, date))
    ) {
      output.push('positionRel');
    }

    if (
      view === 'month' &&
      plasticTrashDates.find(eventDate => isSameDay(eventDate, date))
    ) {
      output.push('positionRel');
    }

    return output;
  }

  function tileContent({ date, view }) {
    //Check each entry of eventDates against date to see if it should be highlighted

    const output = [];
    if (
      view === 'month' &&
      recylingDates.find(recylingDate => isSameDay(recylingDate, date))
    ) {
      output.push(
        <svg
          className="recyling-icon"
          width="6"
          height="6"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="10" height="10" fill="#ff5c8a" />
        </svg>
      );
    }

    if (
      view === 'month' &&
      paperTrashDates.find(eventDate => isSameDay(eventDate, date))
    ) {
      console.log(date);
      output.push(
        <svg
          className="papertrash-icon"
          width="6"
          height="6"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="5" r="5" fill="#06d6a0" />
        </svg>
      );
    }

    if (
      view === 'month' &&
      plasticTrashDates.find(eventDate => isSameDay(eventDate, date))
    ) {
      output.push(
        <svg
          className="plastictrash-icon"
          width="7"
          height="7"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.5 0L12.9952 11.25H0.00480938L6.5 0Z" fill="#ee9b00" />
        </svg>
      );
    }

    return output;
  }

  return (
    <div>
      <Calendar
        onChange={onChange}
        tileContent={tileContent}
        tileClassName={tileClassName}
        value={date}
      />
      <div className="container">
        <h3>Legende: </h3>
        <div className="infoBox">
          <p>Recyling</p>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10" height="10" fill="#ff5c8a" />
          </svg>
        </div>
        <div className="infoBox">
          <p>Plastictrash</p>
          <svg
            width="10"
            height="10"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.5 0L12.9952 11.25H0.00480938L6.5 0Z" fill="#ee9b00" />
          </svg>
        </div>
        <div className="infoBox">
          <p>Papertrash</p>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5" cy="5" r="5" fill="#06d6a0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
