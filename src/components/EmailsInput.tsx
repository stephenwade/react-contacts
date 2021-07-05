import * as React from 'react';

import EmailsInputListItem from './EmailsInputListItem';
import AddButton from './AddButton';
import { NewEmail } from '../types';

import './EmailsInput.css';

function EmailsInput(
  props: {
    emails: string[];
    newEmails: NewEmail[];
    hasTriedToSave?: boolean;
    onAddEmailClick?: () => void;
    onNewEmailChange?: (key: string, value: string) => void;
    onEmailRemoveClick?: (index: number) => void;
    onNewEmailRemoveClick?: (key: string) => void;
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
            onRemoveClick={
              onEmailRemoveClick ? () => onEmailRemoveClick(i) : undefined
            }
          />
        ))}
        {newEmails.map((email, i) => (
          <EmailsInputListItem
            new
            key={`new ${email.key}`}
            value={email.email}
            autoFocus={i === newEmails.length - 1}
            hasTriedToSave={hasTriedToSave}
            onChange={
              onNewEmailChange
                ? (value) => onNewEmailChange(email.key, value)
                : undefined
            }
            onRemoveClick={
              onNewEmailRemoveClick
                ? () => onNewEmailRemoveClick(email.key)
                : undefined
            }
          />
        ))}
      </ul>
      <div
        className="EmailsInputAddButton"
        role="button"
        onClick={onAddEmailClick}
        onKeyDown={
          onAddEmailClick
            ? (e) => {
                if (e.key === 'Enter') onAddEmailClick();
              }
            : undefined
        }
        onKeyUp={
          onAddEmailClick
            ? (e) => {
                if (e.key === ' ') onAddEmailClick();
              }
            : undefined
        }
        tabIndex={0}
      >
        <AddButton tabIndex={-1} aria-hidden="true" /> add email
      </div>
    </div>
  );
}

export default EmailsInput;
