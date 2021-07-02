import React, { useState } from 'react';
import { Dialog } from '@reach/dialog';

import AddButton from './AddButton';
import EmailsInput from './EmailsInput';
import LabelContainer from './LabelContainer';
import TextInput, { required } from './TextInput';
import { useAppDispatch, useAppSelector } from '../store';
import {
  deleteContact,
  editorDirty,
  newContact,
  saveContact,
  setActiveContact,
  tryingToSave,
  unselectContact,
} from '../actions/contacts';
import { isValidContact, newNewEmail } from '../types';

import './ContactEditor.css';
import '@reach/dialog/styles.css';

type Props = { loading: boolean };

const ContactEditor = React.forwardRef<HTMLInputElement, Props>(
  function ContactEditor(props: Props, firstInputRef): JSX.Element {
    const { activeContact, deleteInProgress, saveInProgress, hasTriedToSave } =
      useAppSelector((state) => state.contacts);
    const dispatch = useAppDispatch();

    const [showDialog, setShowDialog] = useState(false);

    const { loading } = props;

    return (
      <div className="ContactEditor">
        {activeContact ? (
          <>
            <div className="NameRow">
              <LabelContainer name="firstName" label="First Name">
                <TextInput
                  ref={firstInputRef}
                  value={activeContact.firstName || ''}
                  onChange={(value) => {
                    dispatch(editorDirty());
                    dispatch(setActiveContact({ firstName: value }));
                  }}
                  validator={hasTriedToSave ? required : undefined}
                />
              </LabelContainer>
              <LabelContainer name="lastName" label="Last Name">
                <TextInput
                  value={activeContact.lastName || ''}
                  onChange={(value) => {
                    dispatch(editorDirty());
                    dispatch(setActiveContact({ lastName: value }));
                  }}
                  validator={hasTriedToSave ? required : undefined}
                />
              </LabelContainer>
            </div>
            <div className="EmailRow">
              <LabelContainer name="emails" label="Email">
                <EmailsInput
                  emails={activeContact.emails || []}
                  newEmails={activeContact.newEmails || []}
                  hasTriedToSave={hasTriedToSave}
                  onAddEmailClick={() => {
                    dispatch(editorDirty());
                    dispatch(
                      setActiveContact({
                        newEmails: [
                          ...(activeContact.newEmails || []),
                          newNewEmail(),
                        ],
                      })
                    );
                  }}
                  onNewEmailChange={(newEmailKey, email) => {
                    dispatch(editorDirty());
                    if (activeContact.newEmails) {
                      const newEmails = [...activeContact.newEmails];
                      const newEmailIndex = newEmails.findIndex(
                        (newEmail) => newEmail.id === newEmailKey
                      );
                      newEmails[newEmailIndex] = {
                        ...newEmails[newEmailIndex],
                        email,
                      };
                      dispatch(setActiveContact({ newEmails }));
                    }
                  }}
                  onEmailRemoveClick={(emailIndex) => {
                    dispatch(editorDirty());
                    if (
                      activeContact.emails &&
                      activeContact.emails.length > emailIndex
                    ) {
                      const emails = [...activeContact.emails];
                      emails.splice(emailIndex, 1);
                      dispatch(setActiveContact({ emails }));
                    }
                  }}
                  onNewEmailRemoveClick={(newEmailKey) => {
                    dispatch(editorDirty());
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
                <button
                  className="destructive"
                  onClick={() => setShowDialog(true)}
                >
                  {deleteInProgress ? 'Deleting…' : 'Delete'}
                </button>
              </div>
              <div className="ButtonsGroup">
                <button
                  className="secondary"
                  // TODO: Check if ContactEditor is dirty and ask for confirmation
                  onClick={() => dispatch(unselectContact())}
                >
                  Cancel
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    if (saveInProgress) return;
                    dispatch(tryingToSave());
                    if (isValidContact(activeContact))
                      dispatch(saveContact(activeContact));
                  }}
                >
                  {saveInProgress ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
            <Dialog
              isOpen={showDialog}
              onDismiss={() => setShowDialog(false)}
              aria-label="Confirm deletion"
            >
              <div>Are you sure you want to delete this contact?</div>
              <div className="DialogButtonsRow">
                <button
                  className="destructive"
                  onClick={() => {
                    if (deleteInProgress) return;
                    if (activeContact.id !== undefined)
                      dispatch(deleteContact(activeContact.id));
                    else dispatch(unselectContact());
                    setShowDialog(false);
                  }}
                >
                  Delete
                </button>
                <button
                  className="secondary"
                  onClick={() => setShowDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </Dialog>
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
);

export default ContactEditor;
