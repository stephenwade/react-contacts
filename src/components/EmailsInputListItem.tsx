import * as React from 'react';

import RemoveButton from './RemoveButton';
import TextInput from './TextInput';
import { isValidEmailAddress } from '../types';

import './EmailsInputListItem.css';

function EmailsInputListItem(
  props:
    | {
        value: string;
        onRemoveClick?: () => void;
      }
    | {
        new: true;
        value: string;
        autoFocus?: boolean;
        hasTriedToSave?: boolean;
        onChange?: (value: string) => void;
        onRemoveClick?: () => void;
      }
): JSX.Element {
  if ('new' in props) {
    const { value, autoFocus, hasTriedToSave, onChange, onRemoveClick } = props;

    return (
      <li className="EmailsInputListItem new">
        <TextInput
          value={value}
          autoFocus={autoFocus}
          onChange={onChange}
          validator={hasTriedToSave ? isValidEmailAddress : undefined}
          aria-label="New email"
        />
        <RemoveButton
          tabIndex={0}
          onClick={onRemoveClick}
          aria-label="Remove email"
        />
      </li>
    );
  }

  const { value, onRemoveClick } = props;

  return (
    <li className="EmailsInputListItem">
      {value} <RemoveButton onClick={onRemoveClick} aria-label="Remove email" />
    </li>
  );
}

export default EmailsInputListItem;
