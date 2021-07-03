import * as React from 'react';

import EmailsInputListItem from './EmailsInputListItem';
import { NewEmail } from '../types';

import './EmailsInput.css';

function EmailsInput(
  props: {
    emails: string[];
    newEmails: NewEmail[];
    hasTriedToSave: boolean;
    onAddEmailClick: () => void;
    onNewEmailChange: (key: string, value: string) => void;
    onEmailRemoveClick: (index: number) => void;
    onNewEmailRemoveClick: (key: string) => void;
  } & React.AriaAttributes
): JSX.Element {
  const {
    emails,
    newEmails,
    hasTriedToSave,
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
            value={email}
            onRemoveClick={() => onEmailRemoveClick(i)}
          />
        ))}
        {newEmails.map((email, i) => (
          <EmailsInputListItem
            new
            key={`new ${email.id}`}
            value={email.email}
            autoFocus={i === newEmails.length - 1}
            hasTriedToSave={hasTriedToSave}
            onChange={(value) => onNewEmailChange(email.id, value)}
            onRemoveClick={() => onNewEmailRemoveClick(email.id)}
          />
        ))}
        <EmailsInputListItem add onAddClick={onAddEmailClick} />
      </ul>
    </div>
  );
}

export default EmailsInput;
