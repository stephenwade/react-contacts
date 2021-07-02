import React, { useEffect, useState } from 'react';

import './TextInput.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  validator?: (value: string, oldValue?: string) => boolean;
} & React.AriaAttributes;

const TextInput = React.forwardRef<HTMLInputElement, Props>(function TextInput(
  props: Props,
  ref
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
    <input
      ref={ref}
      className={`TextInput ${valid ? '' : 'error'}`}
      type="text"
      value={value}
      onChange={onInputChange}
      {...aria}
    />
  );
});

export default TextInput;

export function required(value: string): boolean {
  return Boolean(value);
}
