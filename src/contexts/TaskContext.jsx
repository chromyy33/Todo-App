import { createContext, useContext, useState, useEffect } from "react";
import { createStarterData } from "../API/StarterData";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [allTaskData, setAllTaskData] = useState(() => {
    const savedData = localStorage.getItem("allTaskData");

    const data = savedData ? JSON.parse(savedData) : createStarterData();
    return data;
  });
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [starterData, setStarterData] = useState(() => {
    // Initialize starterData based on currentDate
    const today = currentDate.getDate();
    const filteredData = allTaskData.find(
      (taskData) => taskData.tasksDate === today
    );

    if (!filteredData) {
      setAllTaskData((prevData) => {
        return [...prevData, { tasksDate: today, taskList: [] }];
      });
    }
    return filteredData || { tasksDate: today, taskList: [] };
  });


  useEffect(() => {
    // Save data to localStorage whenever allTaskData changes
    localStorage.setItem("allTaskData", JSON.stringify(allTaskData));
  }, [allTaskData]); // Dependency array to trigger the effect when allTaskData changes
  
  
  const [hour, setHour] = useState(() => {
    const currentHour = new Date().getHours();
    // Convert 24-hour format to 12-hour format
    const finalTime = currentHour % 12 || 12;
    return finalTime;
  });

  const [period, setPeriod] = useState(() => {
    const currentHour = new Date().getHours();
    const finalHour = currentHour >= 12 ? "PM" : "AM";
    return finalHour;
  });
  const toastStyle = {
    style: {
      backgroundColor: "#3c424a",
      color: "#e1eaf2",
    },
    iconTheme: {
      primary: "#2e3238",
      secondary: "#e1eaf2",
    },
  };

  return (
    <TaskContext.Provider
      value={{
        starterData,
        setStarterData,
        allTaskData,
        setAllTaskData,
        hour,
        period,
        setHour,
        setPeriod,
        currentDate,
        setCurrentDate,
        toastStyle,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("Task Context was used out side the Task Provider");
  return context;
}
export { TaskProvider, useTask };
