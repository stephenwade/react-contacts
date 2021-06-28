import React from 'react';

import './ContactEditor.css';

function ContactEditor(): JSX.Element {
  // TODO: Get active contact from Redux

  return (
    <div className="ContactEditor">
      <h2>
        <em>No contact selected</em>
      </h2>
    </div>
  );
}

export default ContactEditor;
