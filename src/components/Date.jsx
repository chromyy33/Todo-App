// import { useEffect, useState } from "react";
// import { useTask } from "../contexts/TaskContext";
// import { createStarterData } from "../API/StarterData";
// function DateDisplay() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [currentDay, setCurrentDay] = useState("");
//   const [dateDisplay, setDateDisplay] = useState("");
//   const { starterData, setStarterData, allTaskData, setAllTaskData } =
//     useTask();
//   const dayInMilliSec = 24 * 60 * 60 * 1000;
//   const fullWeekdays = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const shortMonths = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   useEffect(() => {
//     const day = fullWeekdays[currentDate.getDay()];
//     const date = currentDate.getDate();
//     const year = currentDate.getFullYear();
//     const month = shortMonths[currentDate.getMonth()];
//     const dateDisplay = `${month} ${date}, ${year}`;

//     setDateDisplay(dateDisplay);
//     setCurrentDay(day);
//   }, [currentDate]);

//   function handlePrev() {
//     const dateLast = new Date(new Date() - 7 * dayInMilliSec).getDate();

//     if (currentDate.getDate() === dateLast) return;

//     // Update the currentDate to the previous day
//     const newDate = new Date(currentDate.getTime() - dayInMilliSec);
//     setCurrentDate(newDate);
//     const filteredData = allTaskData.find(
//       (taskData) => Number(taskData.tasksDate) === Number(newDate.getDate())
//     );
//     console.log(filteredData);
//     // Update the starterData based on the currentDate
//     setStarterData(filteredData);
//   }

//   function handleNext() {
//     const dateLast = new Date(
//       new Date().getTime() + 7 * dayInMilliSec
//     ).getDate();

//     if (currentDate.getDate() === dateLast) return;

//     // Update the currentDate to the previous day
//     const newDate = new Date(currentDate.getTime() + dayInMilliSec);
//     setCurrentDate(newDate);

//     // Update the starterData based on the newDate
//     setStarterData(() => {
//       const filteredData = createStarterData().filter(
//         (taskData) => taskData.tasksDate === newDate.getDate()
//       );

//       return filteredData[0] || null; // Return the first matching result or null
//     });
//   }

//   const arrowIcon = (
//     <svg
//       className="date-icon"
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="15 18 9 12 15 6"></polyline>
//     </svg>
//   );

//   return (
//     <div className="date flex column ai-c jc-c">
//       <button className="left btn" onClick={handlePrev}>
//         {arrowIcon}
//       </button>
//       <h3 className="date-day">{currentDay}</h3>
//       <p className="date-current">{dateDisplay || "Loading..."}</p>
//       <button className="right btn" onClick={handleNext}>
//         {arrowIcon}
//       </button>
//     </div>
//   );
// }

// export default DateDisplay;
import { useEffect, useState } from "react";
import { useTask } from "../contexts/TaskContext";

function DateDisplay() {
  const [currentDay, setCurrentDay] = useState("");
  const [dateDisplay, setDateDisplay] = useState("");
  const {
    currentDate,
    setCurrentDate,
    starterData,
    setStarterData,
    allTaskData,
  } = useTask();
  const dayInMilliSec = 24 * 60 * 60 * 1000;
  const fullWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const day = fullWeekdays[currentDate.getDay()];
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();
    const month = shortMonths[currentDate.getMonth()];
    const dateDisplay = `${month} ${date}, ${year}`;

    // Update date display and day
    setDateDisplay(dateDisplay);
    setCurrentDay(day);
  }, [currentDate]);

  function handlePrev() {
    // Update currentDate to the previous day
    const newDate = new Date(currentDate.getTime() - dayInMilliSec);
    setCurrentDate(newDate);

    // Optionally, update starterData based on the newDate
    const filteredData = allTaskData.find(
      (taskData) => Number(taskData.tasksDate) === Number(newDate.getDate())
    );
    setStarterData(
      filteredData || { tasksDate: newDate.getDate(), taskList: [] }
    );
  }

  function handleNext() {
    // Update currentDate to the next day
    const newDate = new Date(currentDate.getTime() + dayInMilliSec);
    setCurrentDate(newDate);

    // Optionally, update starterData based on the newDate
    const filteredData = allTaskData.find(
      (taskData) => Number(taskData.tasksDate) === Number(newDate.getDate())
    );
    setStarterData(
      filteredData || { tasksDate: newDate.getDate(), taskList: [] }
    );
  }

  const arrowIcon = (
    <svg
      className="date-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );

  return (
    <div className="date flex column ai-c jc-c">
      <button className="left btn" onClick={handlePrev}>
        {arrowIcon}
      </button>
      <h3 className="date-day">{currentDay}</h3>
      <p className="date-current">{dateDisplay || "Loading..."}</p>
      <button className="right btn" onClick={handleNext}>
        {arrowIcon}
      </button>
    </div>
  );
}

export default DateDisplay;
