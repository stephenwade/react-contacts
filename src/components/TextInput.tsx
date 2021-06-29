import React from 'react';

import './TextInput.css';

function TextInput(
  props: { value: string } & React.AriaAttributes
): JSX.Element {
  const { value, ...aria } = props;

  return (
    <div className="TextInput" {...aria}>
      <input type="text" value={value} />
    </div>
  );
}

export default TextInput;
