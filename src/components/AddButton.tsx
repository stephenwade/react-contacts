import React from 'react';

import './AddButton.css';

function AddButton(): JSX.Element {
  return (
    <svg
      className="AddButton"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" />
      <path strokeWidth="2" stroke="white" d="M 4 16h 24M 16,4v 24Z" />
    </svg>
  );
}

export default AddButton;
