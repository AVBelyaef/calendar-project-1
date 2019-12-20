"use strict";
// initializing a new calendar object, that will use an html container to create itself

let calendar = new Calendar("calendarContainer", // id of html container for calendar

  "medium", // size of calendar, can be small | medium | large
  [
    "Monday", // left most day of calendar labels
    3 // maximum length of the calendar labels
  ], [
        "#FFFBEB", // primary color
        "#905E9C", // primary dark color
        "#663B4D", // text color
        "#ffecb3", // text dark color

        "#ffffff"
  ],
  {
    indicator: true,
    indicator_type: 1, // indicator type, can be 0 (not numeric) | 1 (numeric)
    indicator_pos: "bottom" // indicator position, can be top | bottom
  }
);
fetch('/data')
  .then(res => res.json())
  .then(data => {
    let organizer = new Organizer("organizerContainer", // id of html container for calendar
      calendar, // defining the calendar that the organizer is related to
      data // giving the organizer the static data that should be displayed
    );
  });
// initializing a new organizer object, that will use an html container to create itself
