
// export default CarryoverBtn;
import { useState } from "react";
import { useTask } from "../contexts/TaskContext";
import toast from "react-hot-toast";

function CarryoverBtn() {
  const [isChecked, setIsChecked] = useState(false);
  const { setAllTaskData, allTaskData, currentDate, toastStyle, starterData } =
    useTask();

  // Function to handle checkbox state and move tasks
  function handleChecked() {
    setIsChecked((prevChecked) => {
      const newCheckedState = !prevChecked;
      handleMoveIncompleteTasks(newCheckedState);
      return newCheckedState;
    });
  }

  // Function to move incomplete tasks based on the checkbox state
  function moveIncompleteTasks(allTasks, currentDate, move) {
    const todayDate = currentDate.getDate();
    const previousDate = todayDate - 1;

    const todayTaskData = allTasks.find((day) => +day.tasksDate === todayDate);
    const previousTaskData = allTasks.find(
      (day) => +day.tasksDate === previousDate
    );

    if (move) {
      // Move incomplete tasks to today's task list and add `isRolledOver: true`
      if (previousTaskData) {
        const incompleteTasks = previousTaskData.taskList.filter(
          (task) => !task.completed
        );

        if (incompleteTasks.length > 0 && todayTaskData) {
          const updatedTasks = incompleteTasks.map((task) => ({
            ...task,
            isRolledOver: true, // Mark task as rolled over
          }));

          todayTaskData.taskList = [
            ...todayTaskData.taskList,
            ...updatedTasks,
          ];
        }

        previousTaskData.taskList = previousTaskData.taskList.filter(
          (task) => task.completed
        );
      }
    } else {
      // Move tasks back to the previous day only if `isRolledOver: true`
      if (todayTaskData) {
        const movedBackTasks = todayTaskData.taskList.filter(
          (task) => task.isRolledOver && !task.completed
        );

        if (movedBackTasks.length > 0 && previousTaskData) {
          previousTaskData.taskList = [
            ...previousTaskData.taskList,
            ...movedBackTasks.map((task) => ({
              ...task,
              isRolledOver: false, // Remove the rolled over flag
            })),
          ];
        }

        todayTaskData.taskList = todayTaskData.taskList.filter(
          (task) => task.completed || !task.isRolledOver
        );
      }
    }

    return [...allTasks];
  }

  // Function to handle task movement and show toast notifications
  const handleMoveIncompleteTasks = (checkedState) => {
    const updatedTaskData = moveIncompleteTasks(
      allTaskData,
      currentDate,
      checkedState
    );
    setAllTaskData(updatedTaskData);

    if (checkedState) {
      toast.remove();
      toast.success("Incomplete tasks rolled over.", toastStyle);
    } else {
      toast.remove();
      toast.success("Tasks moved back to previous day.", toastStyle);
    }
  };

  function isToday(starterData) {
    const today = new Date(); // Get today's date
    const todayDate = today.getDate(); // Get the day of the month for today

    // Check if `starterData` contains a date that matches today's date
    return +starterData.tasksDate === todayDate;
  }

  // Only render the button if today's data is present
  if (!isToday(starterData)) return null;

  return (
    <div className="carryover flex ai-c">
      <input
        onClick={handleChecked}
        type="checkbox"
        className={`task-item-checkbox ${isChecked ? "visible" : ""}`}
        checked={isChecked}
        readOnly
      />
      <span>Rollover Tasks?</span>
    </div>
  );
}

export default CarryoverBtn;
