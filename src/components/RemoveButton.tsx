import * as React from 'react';

import './RemoveButton.css';

function RemoveButton(
  props: {
    onClick?: () => void;
    tabIndex?: number;
  } & React.AriaAttributes
): JSX.Element {
  const { onClick, tabIndex, ...aria } = props;

  return (
    <button
      className="RemoveButton"
      onClick={onClick}
      tabIndex={tabIndex}
      {...aria}
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" />
        <path strokeWidth="2" stroke="white" d="M 4 16h 24Z" />
      </svg>
    </button>
  );
}

export default RemoveButton;
