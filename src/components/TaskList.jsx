import TaskItem from "./TaskItem";
import PinnedTask from "./PinnedTask";
import { useTask } from "../contexts/TaskContext";
function TaskList() {
  const { starterData } = useTask();

  const regularTask = [...starterData.taskList].filter(
    (task) => task.isPinned === !true
  );
  {
    if (!starterData.taskList.length) {
      return (
        <div className=" no-task-wrapper flex column ai-c jc-c">
          <p className="no-task-heading">No tasks yet, start adding now!</p>
          <img src="image.png" alt="" className="no-task" />
        </div>
      );
    }
  }
  return (
    <div className="task-list-scroll">
      <ul className="task-list-container flex column">
        <PinnedTask starterData={starterData.taskList} />
        <div className="regular-task">
          {regularTask.map((taskData) => (
            <TaskItem taskData={taskData} key={taskData.taskId} />
          ))}
        </div>
      </ul>
    </div>
  );
}

export default TaskList;
