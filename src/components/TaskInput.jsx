
import { useState, useEffect, useRef } from "react";
import DayTimePicker from "./DayTimePicker";
import { useTask } from "../contexts/TaskContext";
import toast from "react-hot-toast";

function TaskInput() {
  const {
    hour,
    period,
    setAllTaskData,
    starterData,
    setStarterData,
    allTaskData,
    currentDate,
    toastStyle,
  } = useTask();

  const [task, setTask] = useState("");
  const [pickerVisibility, setPickerVisibility] = useState(false);
  const inputRef = useRef(null); // Ref for the TaskItem container
  const inputVal = useRef(null); // Ref for the input value

  function handleInput(e) {
    setTask(e.target.value);
  }

  function handlePicker() {
    setPickerVisibility(!pickerVisibility);
  }

  // Function to add a task
  function handleAdd() {
    const taskHeading = inputVal.current.value;
    if (!taskHeading) return;

    const taskObj = {
      taskId: new Date().getTime(),
      taskNote: 'Click to Edit or Delete',
      taskHeading,
      isChecked: false,
      isPinned: false,
      taskDeadline: `Due ${hour} ${period}`,
    };

    setAllTaskData((prevData) => {
      const arrWithoutCurrent = prevData.filter(
        (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
      );

      // Create the updated entry with the new task added
      const updatedStarterData = {
        ...starterData,
        taskList: [...starterData.taskList, taskObj],
      };

      // Return the updated array with the updated starterData and other entries
      return [updatedStarterData, ...arrWithoutCurrent];
    });

    setPickerVisibility(false);

    toast.remove();
    toast.success("Task Added", { ...toastStyle });
    setTask("");
    inputVal.current.blur();

  }

  // Function to handle pressing the "Enter" key to add the task
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or any default behavior
      handleAdd();
    }
  };

  // Close picker when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.parentElement !== inputVal.current.parentElement) {
      setPickerVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [starterData, allTaskData]);

  // Initialize starter data when allTaskData changes
  useEffect(() => {
    const today = new Date().getDate();
    const filteredData = allTaskData.find(
      (taskData) => taskData.tasksDate === today
    );
    setStarterData(filteredData || { tasksDate: today, taskList: [] });
  }, [allTaskData]);

  // Function to sort tasks based on their deadline
  function sortTasksForCurrentDate(allTaskData, currentDate) {
    function convertTo24HrTime(deadline) {
      const match = deadline.match(/(\d+)\s(AM|PM)/);
      let [_, hour, period] = match;
      hour = parseInt(hour);

      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      return hour;
    }

    const updatedTaskData = allTaskData.map((day) => {
      if (day.tasksDate === currentDate) {
        return {
          ...day,
          taskList: day.taskList.slice().sort((a, b) => {
            const timeA = convertTo24HrTime(a.taskDeadline);
            const timeB = convertTo24HrTime(b.taskDeadline);
            return timeA - timeB;
          }),
        };
      }
      return day;
    });

    return updatedTaskData;
  }

  // Function to sort and update state
  const handleSortTasks = () => {
    if (!starterData.taskList.length) return;
    const sortedData = sortTasksForCurrentDate(
      allTaskData,
      currentDate.getDate()
    );
    setAllTaskData(sortedData); // Update the state with sorted tasks
    toast.remove();
    toast.success("Tasks Sorted", { ...toastStyle });
  };

  const sortIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7H19M5 12H15M5 17H11"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="flex ai-c jc-c task-input-wrapper" ref={inputRef}>
      <div className="task-input-container flex ">
        <button className="sort-btn btn" onClick={handleSortTasks}>
          {sortIcon}
        </button>
        <input
          className="task-input"
          type="text"
          value={task}
          onChange={handleInput}
          placeholder="Add a task..."
          onFocus={handlePicker}
          ref={inputVal}
          onKeyDown={handleKeyDown} // Listen for "Enter" key to add the task
        />
        {pickerVisibility && <DayTimePicker />}
      </div>
      <button className="btn add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default TaskInput;
