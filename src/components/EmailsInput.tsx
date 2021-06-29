import React from 'react';

import EmailsInputListItem from './EmailsInputListItem';

import './EmailsInput.css';

function EmailsInput(
  props: { emails: string[] } & React.AriaAttributes
): JSX.Element {
  const { emails, ...aria } = props;

  return (
    <div className="EmailsInput" {...aria}>
      <ul>
        {emails.map((email, i) => (
          <EmailsInputListItem key={i} email={email} />
        ))}
        <EmailsInputListItem new />
      </ul>
    </div>
  );
}

export default EmailsInput;
