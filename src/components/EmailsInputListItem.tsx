import React from 'react';

import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import TextInput from './TextInput';
import { isValidEmailAddress } from '../types';

import './EmailsInputListItem.css';

function EmailsInputListItem(
  props:
    | {
        value: string;
        onRemoveClick: () => void;
      }
    | {
        add: true;
        onAddClick: () => void;
      }
    | {
        new: true;
        value: string;
        hasTriedToSave: boolean;
        onChange: (value: string) => void;
        onRemoveClick: () => void;
      }
): JSX.Element {
  if ('new' in props) {
    const { value, hasTriedToSave, onChange, onRemoveClick } = props;

    return (
      <li className="EmailsInputListItem new">
        <TextInput
          value={value}
          onChange={onChange}
          validator={hasTriedToSave ? isValidEmailAddress : undefined}
        />
        <RemoveButton onClick={onRemoveClick} />
      </li>
    );
  }

  if ('add' in props) {
    const { onAddClick } = props;

    return (
      <li className="EmailsInputListItem add" onClick={onAddClick}>
        <span>
          <AddButton /> add email
        </span>
      </li>
    );
  }

  const { value, onRemoveClick } = props;

  return (
    <li className="EmailsInputListItem">
      {value} <RemoveButton onClick={onRemoveClick} />
    </li>
  );
}

export default EmailsInputListItem;
