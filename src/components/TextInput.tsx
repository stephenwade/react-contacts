import * as React from 'react';
import { useEffect, useState } from 'react';

import './TextInput.css';

type Props = {
  value: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
  validator?: (value: string, oldValue?: string) => boolean;
} & React.AriaAttributes;

const TextInput = React.forwardRef<HTMLInputElement, Props>(function TextInput(
  props: Props,
  ref
): JSX.Element {
  const { value, autoFocus, onChange, validator, ...aria } = props;

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
      autoFocus={autoFocus}
      onChange={onInputChange}
      {...aria}
    />
  );
});

export default TextInput;

export function required(value: string): boolean {
  return Boolean(value.trim());
}
