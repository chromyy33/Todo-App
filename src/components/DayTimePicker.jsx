// import { useState, useEffect } from "react";
// import { useTask } from "../contexts/TaskContext";
// function DayTimePicker() {
//   const [hour, setHour] = useState(() => {
//     const currentHour = new Date().getHours();
//     // Convert 24-hour format to 12-hour format
//     return currentHour % 12 || 12;
//   });

//   const [period, setPeriod] = useState(() => {
//     const currentHour = new Date().getHours();
//     return currentHour >= 12 ? "PM" : "AM";
//   });
//   const { setHour: setTaskHour, setPeriod: setTaskPeriod } = useTask();

//   // Update context when hour or period state changes
//   useEffect(() => {
//     setTaskHour(hour);
//     setTaskPeriod(period);
//   }, []);

//   const handleChange = (e) => {
//     const newPeriod = e.target.value;
//     setPeriod(newPeriod);
//     setTaskPeriod(newPeriod); // Update context
//   };
//   function handleHour(e) {
//     const newHour = e.target.value;
//     setHour(newHour);
//     setTaskHour(newHour); // Update context
//   }
//   return (
//     <>
//       <select name="time" id="hour" onChange={handleHour} value={hour}>
//         {Array.from({ length: 12 }, (_, i) => {
//           return (
//             <option key={i} value={i + 1}>
//               {i + 1}
//             </option>
//           );
//         })}
//       </select>
//       <select value={period} onChange={handleChange} id="period">
//         <option value="AM">AM</option>
//         <option value="PM">PM</option>
//       </select>
//     </>
//   );
// }

// export default DayTimePicker;
import { useState, useEffect } from "react";
import { useTask } from "../contexts/TaskContext";

function DayTimePicker() {
 
  const {
    hour: taskHour,
    period: taskPeriod,
    setHour: setTaskHour,
    setPeriod: setTaskPeriod,
  } = useTask();
  const [hour, setHour] = useState(taskHour);
  const [period, setPeriod] = useState(taskPeriod);

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    setHour(newHour);
    setTaskHour(newHour); // Update context
  };

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);
    setTaskPeriod(newPeriod); // Update context
  };

  return (
    <>
      <select name="time" id="hour" onChange={handleHourChange} value={hour}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select value={period} onChange={handlePeriodChange} id="period">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </>
  );
}

export default DayTimePicker;
