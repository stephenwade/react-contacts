import React from 'react';

import './RemoveButton.css';

function RemoveButton(props: { onClick: () => void }): JSX.Element {
  const { onClick } = props;

  return (
    <span className="RemoveButton" onClick={onClick}>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" />
        <path strokeWidth="2" stroke="white" d="M 4 16h 24Z" />
      </svg>
    </span>
  );
}

export default RemoveButton;
