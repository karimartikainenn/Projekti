import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import "./scss/styles.scss";
import fi from "date-fns/locale/fi";

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalOpeningHours, setTotalOpeningHours] = useState([]);
  const [totalCityOpeningHours, setTotalCityOpeningHours] = useState({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    axios
      .get(
        `https://api.kirjastot.fi/v4/library?city=15863&with=schedules&period.start=${formattedStartDate}&period.end=${formattedEndDate}&limit=9999`
      )
      .then((response) => {
        const libraries = response.data.items;

        const excludedLibraries = [
          "Aalto-yliopiston oppimiskeskus",
          "Kotipalvelu Taika",
          "Laurea-kirjasto Leppävaara",
          "Laurea-kirjasto Otaniemi",
          "Metropolian kirjasto | Karamalmi",
          "Venäjänkielinen kirjasto",
          "Kirjastoauto Espoo",
        ];

        let totalDurationCity = 0;

        const totalOpeningHoursData = libraries
          .filter((library) => !excludedLibraries.includes(library.name))
          .map((library) => {
            const schedules = library.schedules;
            let totalDuration = 0;

            schedules.forEach((schedule) => {
              schedule.times.forEach((time) => {
                const from = new Date(`1970-01-01T${time.from}:00`);
                const to = new Date(`1970-01-01T${time.to}:00`);

                if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
                  const duration = (to - from) / (1000 * 60);
                  totalDuration += duration;
                  totalDurationCity += duration;
                }
              });
            });

            const hours = Math.floor(totalDuration / 60);

            return {
              name: library.name,
              totalOpeningHours: `${hours} hours`,
            };
          });

        const cityHours = Math.floor(totalDurationCity / 60);
        setTotalCityOpeningHours({ hours: cityHours, minutes: 0 });

        setTotalOpeningHours(totalOpeningHoursData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [startDate, endDate]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1>Aukioloajat</h1>
      <div className="date-picker-container">
        <div>
          <label>Alkupäivä:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale={fi}
          />
        </div>
        <div>
          <label>Loppupäivä:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            locale={fi}
          />
        </div>
      </div>
      <br></br>
      <h2>Yhteensä: {totalCityOpeningHours.hours} hours</h2>
      <br></br>
      <ul className="list-group">
        {totalOpeningHours.map((library) => (
          <li className="list-group-item" key={library.name}>
            {library.name}: {library.totalOpeningHours}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
