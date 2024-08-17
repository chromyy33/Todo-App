function MemoOptions({ handleNoteEdit, handleDeleteNote }) {
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

  return (
    <span className="memo-icons flex ">
      <span onClick={handleNoteEdit} className="flex ai-e">
        
        {editIcon}
      </span>
      <span className="flex ai-c" onClick={handleDeleteNote}>
        {deleteIcon}
      </span>
    </span>
  );
}

export default MemoOptions;
