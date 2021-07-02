import React from 'react';

import AddButton from './AddButton';
import RemoveButton from './RemoveButton';
import TextInput from './TextInput';

import './EmailsInputListItem.css';

function EmailsInputListItem(
  props:
    | {
        email: string;
        onRemoveClick: () => void;
      }
    | {
        add: true;
        onAddClick: () => void;
      }
    | {
        new: true;
        value: string;
        onChange: (value: string) => void;
        onRemoveClick: () => void;
      }
): JSX.Element {
  if ('new' in props) {
    const { value, onChange, onRemoveClick } = props;

    return (
      <li className="EmailsInputListItem new">
        <TextInput value={value} onChange={onChange} />
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

  const { email, onRemoveClick } = props;

  return (
    <li className="EmailsInputListItem">
      {email} <RemoveButton onClick={onRemoveClick} />
    </li>
  );
}

export default EmailsInputListItem;
