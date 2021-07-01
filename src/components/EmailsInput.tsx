import React from 'react';

import EmailsInputListItem from './EmailsInputListItem';
import { NewEmail } from '../types';

import './EmailsInput.css';

function EmailsInput(
  props: {
    emails: string[];
    newEmails: NewEmail[];
    onAddEmailClick: React.MouseEventHandler<HTMLLIElement>;
    onNewEmailChange: (
      key: string
    ) => React.ChangeEventHandler<HTMLInputElement>;
    onEmailRemoveClick: (
      index: number
    ) => React.MouseEventHandler<HTMLSpanElement>;
    onNewEmailRemoveClick: (
      key: string
    ) => React.MouseEventHandler<HTMLSpanElement>;
  } & React.AriaAttributes
): JSX.Element {
  const {
    emails,
    newEmails,
    onAddEmailClick,
    onNewEmailChange,
    onEmailRemoveClick,
    onNewEmailRemoveClick,
    ...aria
  } = props;

  return (
    <div className="EmailsInput" {...aria}>
      <ul>
        {emails.map((email, i) => (
          <EmailsInputListItem
            key={`existing ${email} ${i}`}
            email={email}
            onRemoveClick={onEmailRemoveClick(i)}
          />
        ))}
        {newEmails.map((email) => (
          <EmailsInputListItem
            new
            key={`new ${email.id}`}
            email={email.id}
            onChange={onNewEmailChange(email.id)}
            onRemoveClick={onNewEmailRemoveClick(email.id)}
          />
        ))}
        <EmailsInputListItem add onAddClick={onAddEmailClick} />
      </ul>
    </div>
  );
}

export default EmailsInput;
