import React, { useState } from 'react';

import './TextInput.css';

function TextInput(
  props: {
    value: string;
    required?: boolean;
    onChange: (value: string) => void;
  } & React.AriaAttributes
): JSX.Element {
  const { value, required, onChange, ...aria } = props;

  const [currentValue, setCurrentValue] = useState<string>(value);
  const [empty, setEmpty] = useState(false);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const oldValue = currentValue;
    const newValue = e.target.value;

    if (oldValue && !newValue) {
      setEmpty(true);
    }

    if (newValue) {
      setEmpty(false);
    }

    setCurrentValue(e.target.value);

    onChange(e.target.value);
  };

  return (
    <div className={`TextInput ${empty && required ? 'error' : ''}`} {...aria}>
      <input type="text" value={value} onChange={onInputChange} />
    </div>
  );
}

export default TextInput;
