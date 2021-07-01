import React from 'react';

import AddButton from './AddButton';
import EmailsInput from './EmailsInput';
import LabelContainer from './LabelContainer';
import TextInput from './TextInput';
import { useAppDispatch, useAppSelector } from '../store';
import {
  newContact,
  setActiveContact,
  unselectContact,
} from '../actions/contacts';
import { newNewEmail } from '../types';

import './ContactEditor.css';

function ContactEditor(props: { loading: boolean }): JSX.Element {
  const { activeContact } = useAppSelector((state) => state.contacts);
  const dispatch = useAppDispatch();

  const { loading } = props;

  return (
    <div className="ContactEditor">
      {activeContact ? (
        <>
          <div className="NameRow">
            <LabelContainer name="firstName" label="First Name">
              <TextInput
                value={activeContact.firstName || ''}
                required
                onChange={(e) =>
                  dispatch(setActiveContact({ firstName: e.target.value }))
                }
              />
            </LabelContainer>
            <LabelContainer name="lastName" label="Last Name">
              <TextInput
                value={activeContact.lastName || ''}
                required
                onChange={(e) =>
                  dispatch(setActiveContact({ lastName: e.target.value }))
                }
              />
            </LabelContainer>
          </div>
          <div className="EmailRow">
            <LabelContainer name="emails" label="Email">
              <EmailsInput
                emails={activeContact.emails || []}
                newEmails={activeContact.newEmails || []}
                onAddEmailClick={() =>
                  dispatch(
                    setActiveContact({
                      newEmails: [
                        ...(activeContact.newEmails || []),
                        newNewEmail(),
                      ],
                    })
                  )
                }
                onNewEmailChange={(newEmailKey) => (e) => {
                  if (activeContact.newEmails) {
                    const newEmails = [...activeContact.newEmails];
                    const newEmailIndex = newEmails.findIndex(
                      (newEmail) => newEmail.id === newEmailKey
                    );
                    newEmails[newEmailIndex] = {
                      ...newEmails[newEmailIndex],
                      email: e.target.value,
                    };
                    dispatch(setActiveContact({ newEmails }));
                  }
                }}
                onEmailRemoveClick={(emailIndex) => () => {
                  if (
                    activeContact.emails &&
                    activeContact.emails.length > emailIndex
                  ) {
                    const emails = [...activeContact.emails];
                    emails.splice(emailIndex, 1);
                    dispatch(setActiveContact({ emails }));
                  }
                }}
                onNewEmailRemoveClick={(newEmailKey) => () => {
                  if (activeContact.newEmails) {
                    const newEmails = [...activeContact.newEmails];
                    const newEmailIndex = newEmails.findIndex(
                      (newEmail) => newEmail.id === newEmailKey
                    );
                    newEmails.splice(newEmailIndex, 1);
                    dispatch(setActiveContact({ newEmails }));
                  }
                }}
              />
            </LabelContainer>
          </div>
          <div className="ButtonsRow">
            <div className="ButtonsGroup">
              <button className="destructive">Delete</button>
            </div>
            <div className="ButtonsGroup">
              <button
                className="secondary"
                onClick={() => dispatch(unselectContact())}
              >
                Cancel
              </button>
              <button className="primary">Save</button>
            </div>
          </div>
        </>
      ) : (
        <div className="EmptyMessage">
          <span>
            {loading ? (
              <>Loading…</>
            ) : (
              <>
                Click a contact to view or edit it. Click{' '}
                <AddButton onClick={() => dispatch(newContact())} /> to add a
                new contact.
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export default ContactEditor;
