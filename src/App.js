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


  }

  return (
    <div>
      <Calendar
        onChange={onChange}
        tileContent={tileContent}
        tileClassName={tileClassName}
        value={date}
      />
    </div>
  );
}

export default App;
