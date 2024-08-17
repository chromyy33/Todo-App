import { useEffect, useRef, useState } from "react";
import TaskMenu from "./TaskMenu";
import MemoOptions from "./MemoOptions";
import { useTask } from "../contexts/TaskContext";
import toast from "react-hot-toast";
function TaskItem({ taskData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditableNote, setIsEditableNote] = useState(false);

  const taskItemRef = useRef(null); // Ref for the TaskItem container
  const headingRef = useRef(null);
  const noteRef = useRef(null);
  const {
    setStarterData,
    allTaskData,
    setAllTaskData,
    starterData,
    currentDate,
    toastStyle,
  } = useTask();
  const { isPinned, completed, taskHeading, taskDeadline, taskNote } = taskData;
  const pinIcon = (
    <svg
      className="task-item-icon"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.47 2.56299L19.75 3.31299C18.705 4.46299 18.208 5.91799 18.094 7.37499L14.031 11.438C11.561 10.998 8.904 11.691 7.001 13.594L6.281 14.314L7.001 15L11.314 19.313L3 27.593V29H4.406L12.688 20.687L16.906 24.907L17.594 25.625L18.312 24.905C20.408 22.811 21.002 19.932 20.375 17.345L23.938 13.781C25.675 13.989 27.451 13.488 28.718 12.221L29.406 11.501L28.719 10.781L21.219 3.28099L20.469 2.56399L20.47 2.56299ZM20.688 5.62499L26.375 11.313C25.55 11.779 24.659 12.071 23.75 11.843L23.187 11.688L22.781 12.094L18.595 16.281L18.157 16.721L18.345 17.314C18.932 19.076 18.66 21.064 17.501 22.689L9.312 14.5C10.767 13.5 12.518 13.04 14.156 13.47L14.686 13.625L15.094 13.219L19.719 8.59299L19.999 8.31299V7.90499C19.999 7.10199 20.293 6.34199 20.688 5.62499Z"
        fill="currentColor"
      />
    </svg>
  );
  function handleDeadline(deadline) {
    const time = deadline.slice(4); // Extract the time part (e.g., "12 AM")
    const [taskHour, period] = time.split(" ");
    let taskHour24 = parseInt(taskHour, 10);

    // Convert the 12-hour format to 24-hour format
    if (period === "PM" && taskHour24 !== 12) {
      taskHour24 += 12; // Convert PM to 24-hour format (e.g., 1 PM -> 13)
    } else if (period === "AM" && taskHour24 === 12) {
      taskHour24 = 0; // Convert midnight (12 AM) to 0 hours
    }

    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const hourRemaining = taskHour24 - currentHour;

    // Handle the overdue case
    if (hourRemaining < 0 || (hourRemaining === 0 && currentMinute > 0)) {
      return "Overdue ⏲️";
    }

    // Calculate time remaining
    if (hourRemaining > 1) {
      return `Due in ${hourRemaining - 1} hrs ${60 - currentMinute} mins`;
    } else if (hourRemaining === 1) {
      return `Due in ${60 - currentMinute} mins`;
    } else if (hourRemaining === 0) {
      return `Due in ${60 - currentMinute} mins`;
    }
  }
  function handleClick() {
    setIsOpen(!isOpen);
  }
  const handleClickOutside = (event) => {
    if (
      taskItemRef.current &&
      !taskItemRef.current.parentElement.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };
  function handleTaskEdit() {
    setIsEditable(true);
    setIsOpen(false);
  }
  function pinTask() {
    console.log(starterData);
    if (!taskData.isPinned) {
      setAllTaskData((prevData) => {
        const arrWithoutCurrent = [...prevData].filter(
          (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
        );
        const updatedTask = { ...taskData, isPinned: true };
        const newArr = starterData.taskList.map((task) =>
          task.taskId === taskData.taskId ? updatedTask : task
        );
        console.log(starterData);
        return [{ ...starterData, taskList: newArr }, ...arrWithoutCurrent];
      });
      toast.remove();
      toast.success("Task Pinned", { ...toastStyle });
    } else {
      setAllTaskData((prevData) => {
        const arrWithoutCurrent = prevData.filter(
          (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
        );
        const updatedTask = { ...taskData, isPinned: false };
        const newArr = starterData.taskList.map((task) =>
          task.taskId === taskData.taskId ? updatedTask : task
        );

        return [{ ...starterData, taskList: newArr }, ...arrWithoutCurrent];
      });

      toast.remove();
      toast.success("Task Unpinned", { ...toastStyle });
    }
  }

  function deleteTask() {
    setAllTaskData((prevData) => {
      const arrWithoutCurrent = prevData.filter(
        (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
      );

      const arrAfterDel = starterData.taskList.filter(
        (task) => task.taskId !== taskData.taskId
      );
      return [{ ...starterData, taskList: arrAfterDel }, ...arrWithoutCurrent];
    });
    toast.remove();
    toast.success("Task Deleted", { ...toastStyle });
  }
  function handleDeleteNote() {
    setAllTaskData((prevData) => {
      // Filter out the current date entry
      const arrWithoutCurrent = prevData.filter(
        (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
      );

      // Map through starterData taskList to clear the task note
      const updatedTaskList = starterData.taskList.map((task) =>
        task.taskId === taskData.taskId
          ? { ...task, taskNote: "" } // Clear the taskNote for the matching task
          : task
      );

      // Return the updated allTaskData with the modified task
      return [
        {
          ...starterData,
          taskList: updatedTaskList,
        },
        ...arrWithoutCurrent,
      ];
    });
    toast.success("Note Deleted", { ...toastStyle });
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    setAllTaskData((prevData) => {
      const arrWithoutCurrent = prevData.filter(
        (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
      );
      // Map through the task list and toggle the `completed` status for the matching task
      const updatedTaskList = starterData.taskList.map((task) =>
        task.taskId === taskData.taskId
          ? { ...task, completed: !task.completed } // Toggle the completed status
          : task
      );

      // Return the updated starterData with the modified taskList
      return [
        {
          ...starterData,
          taskList: updatedTaskList,
        },
        ...arrWithoutCurrent,
      ];
    });

    console.log(starterData);
  };

  function handleNoteEdit() {
    setIsEditableNote(!isEditable);
  }
  function handleAddNote() {
    setIsEditableNote(true);
    setIsOpen(false);
  }
  useEffect(() => {
    function updateData() {
      setAllTaskData((prevData) => {
        const arrWithoutCurrent = prevData.filter(
          (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
        );
        // Map through the task list and toggle the `completed` status for the matching task
        const updatedTaskList = starterData.taskList.map((task) =>
          task.taskId === taskData.taskId
            ? {
                ...task,
                taskHeading: headingRef.current.textContent,
              } // Toggle the completed status
            : task
        );

        // Return the updated starterData with the modified taskList
        return [
          {
            ...starterData,
            taskList: updatedTaskList,
          },
          ...arrWithoutCurrent,
        ];
      });
    }
    if (isEditable && headingRef.current) {
      headingRef.current.focus();
      // Place the cursor at the end of the contentEditable element
      const range = document.createRange();
      const selection = window.getSelection();

      range.selectNodeContents(headingRef.current);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          updateData();
          headingRef.current.blur(); // Remove focus after updating
        }
      };

      // Add event listener for blur
      const handleBlur = () => {
        updateData();
        toast.remove();
        toast.success("Task Updated", { ...toastStyle });
      };

      // Attach event listeners
      document.addEventListener("keydown", handleKeyDown);
      headingRef.current.addEventListener("blur", handleBlur);
    }
  }, [isEditable]);

  useEffect(() => {
    function updateData() {
      setAllTaskData((prevData) => {
        const arrWithoutCurrent = prevData.filter(
          (data) => Number(data.tasksDate) !== Number(starterData.tasksDate)
        );
        // Map through the task list and toggle the `completed` status for the matching task
        const updatedTaskList = starterData.taskList.map((task) =>
          task.taskId === taskData.taskId
            ? {
                ...task,
                taskNote: noteRef.current.textContent.startsWith(" - ")
                  ? noteRef.current.textContent.slice(3)
                  : noteRef.current.textContent,
              } // Toggle the completed status
            : task
        );

        // Return the updated starterData with the modified taskList
        return [
          {
            ...starterData,
            taskList: updatedTaskList,
          },
          ...arrWithoutCurrent,
        ];
      });
    }
    if (isEditableNote && noteRef.current) {
      noteRef.current.focus();
      // Place the cursor at the end of the contentEditable element
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(noteRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          updateData();
          noteRef.current.blur(); // Remove focus after updating
        }
      };

      // Add event listener for blur
      const handleBlur = () => {
        updateData();
        toast.remove();
        toast.success("Note Updated", { ...toastStyle });
      };

      // Attach event listeners
      document.addEventListener("keydown", handleKeyDown);
      noteRef.current.addEventListener("blur", handleBlur);
    }
  }, [isEditableNote]);

  useEffect(() => {
    const today = currentDate.getDate();
    const filteredData = allTaskData.find(
      (taskData) => taskData.tasksDate === today
    );

    // Debugging: Log data to verify
    console.log("Filtered Data:", filteredData);

    setStarterData(filteredData || { tasksDate: today, taskList: [] });
  }, [allTaskData, setStarterData]);

  useEffect(() => {
    const mainCont = document.querySelector(".main-theme");
    mainCont.addEventListener("mousedown", handleClickOutside);

    return () => {
      mainCont.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <li className="task-item flex">
      {isPinned && <span>{pinIcon}</span>}
      <input
        type="checkbox"
        className={`task-item-checkbox ${taskData.completed ? "visible" : ""}`}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="task-item-notes flex column">
        <p
          className={`task-item-heading ${
            taskData.completed ? "strike-through" : ""
          }`}
          ref={headingRef}
          contentEditable={isEditable}
          onBlur={() => {
            setIsEditable(false);
          }}
        >
          {taskHeading}
        </p>
        <p className="task-item-memo flex">
          <span className="container flex ai-c">
            <span
              className="note-memo"
              contentEditable={isEditableNote}
              ref={noteRef}
              onBlur={() => {
                setIsEditableNote(false);
              }}
            >
              {`${taskNote ? " - " + taskNote : taskNote} `}
            </span>

            {taskNote && (
              <MemoOptions
                handleNoteEdit={handleNoteEdit}
                handleDeleteNote={handleDeleteNote}
              />
            )}
          </span>
          <span className="deadline">
            {taskData.completed ? "Completed ✅" : handleDeadline(taskDeadline)}
          </span>
        </p>
      </div>
      <div className="task-btn-container flex ai-c jc-c">
        <button
          onClick={handleClick}
          ref={taskItemRef}
          className="task-item-options"
        >
          ...
        </button>
        {isOpen && (
          <TaskMenu
            taskData={taskData}
            handleTaskEdit={handleTaskEdit}
            pinTask={pinTask}
            deleteTask={deleteTask}
            handleAddNote={handleAddNote}
          />
        )}
      </div>
    </li>
  );
}

export default TaskItem;
