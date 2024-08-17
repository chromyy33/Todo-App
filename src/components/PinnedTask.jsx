import { useTask } from "../contexts/TaskContext";
import TaskItem from "./TaskItem";

function PinnedTask() {
  const { starterData } = useTask();
  const pinnedTask = [...starterData.taskList].filter(
    (task) => task.isPinned === true
  );
  if (!pinnedTask.length) return;
  return (
    <div className="pinned-task-container">
      {pinnedTask.map((taskData) => (
        <TaskItem taskData={taskData} key={taskData.taskId} />
      ))}
    </div>
  );
}

export default PinnedTask;
