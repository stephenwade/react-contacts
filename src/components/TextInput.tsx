import React, { useEffect, useState } from 'react';

import './TextInput.css';

function TextInput(
  props: {
    value: string;
    onChange: (value: string) => void;
    validator?: (value: string, oldValue?: string) => boolean;
  } & React.AriaAttributes
): JSX.Element {
  const { value, onChange, validator, ...aria } = props;

  const [oldValue, setOldValue] = useState<string>(value);
  const [valid, setValid] = useState(true);

  useEffect(
    () => setValid(validator ? validator(value, oldValue) : true),
    [value, oldValue, validator]
  );

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);

    setOldValue(e.target.value);
  };

  return (
    <div className={`TextInput ${valid ? '' : 'error'}`} {...aria}>
      <input type="text" value={value} onChange={onInputChange} />
    </div>
  );
}

export default TextInput;

export function required(value: string): boolean {
  return Boolean(value);
}
