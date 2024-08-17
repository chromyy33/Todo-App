export function createStarterData() {
  //   function generateId(data) {
  //     const id = Math.floor(Math.random() * 10000);
  //     if (id < 1000 || this.some(() => id === this.taskId)) generateId(data);
  //   }

  const allTaskData = [
    {
      tasksDate: 15,
      taskList: [
        {
          taskId: 2323,
          taskHeading: "Walk the Dog",
          taskNote: "",
          completed: false,
          isPinned: false,
          taskDeadline: "Due 10 PM.",
        },
        {
          taskId: 23334,
          taskHeading: "Finish Project",
          taskNote: "Wrap up the powerpoint",
          completed: true,
          isPinned: true,
          taskDeadline: "Due 6 AM.",
        },
        {
          taskId: 3211,
          taskHeading: "Call Amy",
          taskNote: "Not working today",
          completed: false,
          isPinned: false,
          taskDeadline: "Due 5 AM.",
        },
      ],
    },
    {
      tasksDate: 14,
      taskList: [
        {
          taskId: 3,
          taskHeading: "Go buy groceries",
          taskNote: "",
          completed: false,
          isPinned: false,
          taskDeadline: "Due 10 PM.",
        },
        {
          taskId: 34,
          taskHeading: "Finish UX Assignment",
          taskNote: "Wrap up the Empathy Map",
          completed: true,
          isPinned: true,
          taskDeadline: "Due 4 PM.",
        },
        {
          taskId: 11,
          taskHeading: "Fix bugs in the project",
          taskNote: "6 in total",
          completed: true,
          isPinned: false,
          taskDeadline: "Due 5 PM.",
        },
      ],
    },
  ];
  return allTaskData;
}
