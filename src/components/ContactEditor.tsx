import React from 'react';

import AddButton from './AddButton';
import EmailsInput from './EmailsInput';
import LabelContainer from './LabelContainer';
import TextInput from './TextInput';
import { useAppSelector } from '../store';

import './ContactEditor.css';

function ContactEditor(): JSX.Element {
  const { contacts, activeId } = useAppSelector((state) => state.contacts);

  const activeContact = contacts.find((contact) => contact.id === activeId);

  return (
    <div className="ContactEditor">
      {activeContact ? (
        <>
          <div className="NameRow">
            <LabelContainer name="firstName" label="First Name">
              <TextInput value={activeContact.firstName} />
            </LabelContainer>
            <LabelContainer name="lastName" label="Last Name">
              <TextInput value={activeContact.lastName} />
            </LabelContainer>
          </div>
          <div className="EmailRow">
            <LabelContainer name="emails" label="Email">
              <EmailsInput emails={activeContact.emails} />
            </LabelContainer>
          </div>
          <div className="ButtonsRow">
            <div className="ButtonsGroup">
              <button className="destructive">Delete</button>
            </div>
            <div className="ButtonsGroup">
              <button className="secondary">Cancel</button>
              <button className="primary">Save</button>
            </div>
          </div>
        </>
      ) : (
        <div className="EmptyMessage">
          <span>
            Click a contact to view or edit it. Click <AddButton /> to add a new
            contact.
          </span>
        </div>
      )}
    </div>
  );
}

export default ContactEditor;
