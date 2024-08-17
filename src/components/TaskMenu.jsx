function TaskMenu({ handleTaskEdit, pinTask, taskData, deleteTask,handleAddNote }) {
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

  const playIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.24"
    >
      <path
        d="M6 5.91188C6 5.75688 6.037 5.60488 6.107 5.46888C6.337 5.02888 6.857 4.86988 7.27 5.11488L17.56 11.2029C17.7 11.2859 17.815 11.4089 17.892 11.5579C18.122 11.9979 17.972 12.5529 17.56 12.7969L7.27 18.8849C7.14478 18.9604 7.00124 19.0002 6.855 18.9999C6.383 18.9999 6 18.5919 6 18.0889V5.91188Z"
        fill="none"
        stroke="currentColor"
      />
    </svg>
  );

  const editIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.475 5.40807L18.592 7.52507M17.836 3.54307L12.109 9.27007C11.8122 9.56491 11.6102 9.94168 11.529 10.3521L11 13.0001L13.648 12.4701C14.058 12.3881 14.434 12.1871 14.73 11.8911L20.457 6.16407C20.6291 5.99197 20.7656 5.78766 20.8588 5.56281C20.9519 5.33795 20.9998 5.09695 20.9998 4.85357C20.9998 4.61019 20.9519 4.36919 20.8588 4.14433C20.7656 3.91948 20.6291 3.71517 20.457 3.54307C20.2849 3.37097 20.0806 3.23446 19.8557 3.14132C19.6309 3.04818 19.3899 3.00024 19.1465 3.00024C18.9031 3.00024 18.6621 3.04818 18.4373 3.14132C18.2124 3.23446 18.0081 3.37097 17.836 3.54307Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 15V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const deleteIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L6.934 19.071C6.95194 19.323 7.06462 19.5589 7.24939 19.7313C7.43417 19.9036 7.67733 19.9996 7.93 20H16.068C16.3208 19.9999 16.5643 19.904 16.7492 19.7316C16.9342 19.5592 17.047 19.3232 17.065 19.071L18 6M12 11V15M20 6H4M8.5 6L9.044 4.368C9.17664 3.96975 9.43123 3.62333 9.77169 3.37781C10.1122 3.13229 10.5212 3.00011 10.941 3H13.058C13.4779 2.9999 13.8872 3.13198 14.2279 3.37752C14.5686 3.62305 14.8233 3.96959 14.956 4.368L15.5 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const addIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_415_1388)">
        <path
          d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 12H16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7.5V16.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_415_1388">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  return (
    <div className="options">
      <div className="menu-options flex column">
        <button className="btn menu-btn" onClick={pinTask}>
          <span className="pinBtn">{pinIcon}</span>
          {!taskData.isPinned ? "Pin on top" : "Unpin from top"}
        </button>
        <button className="btn menu-btn">
          <span className="playBtn">{playIcon}</span>Start Focus
        </button>
        <button className="btn menu-btn" onClick={handleTaskEdit}>
          <span className="editBtn">{editIcon}</span>Edit Task
        </button>
        <button className="btn menu-btn" onClick={deleteTask}>
          <span>{deleteIcon}</span>Delete Task
        </button>
        {!taskData.taskNote && (
          <button className="btn menu-btn" onClick={handleAddNote}>
            <span>{addIcon}</span>Add Note
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskMenu;
