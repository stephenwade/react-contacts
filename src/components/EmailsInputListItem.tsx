import React from 'react';

import AddButton from './AddButton';
import RemoveButton from './RemoveButton';

import './EmailsInputListItem.css';

function EmailsInputListItem(
  props: { email: string } | { new: boolean }
): JSX.Element {
  if ('new' in props) {
    return (
      <li className="EmailsInputListItem new">
        <AddButton /> add email
      </li>
    );
  }
  const { email } = props;

  return (
    <li className="EmailsInputListItem">
      {email} <RemoveButton />
    </li>
  );
}

export default EmailsInputListItem;
