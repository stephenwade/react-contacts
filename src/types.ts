import { ThunkAction } from 'redux-thunk';

import { AppState } from './store';

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  emails: string[];
};

export type NewEmail = {
  id: string;
  email: string;
};

export const newNewEmail = (): NewEmail => ({
  id: Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, ''),
  email: '',
});

export type EditingContact = Partial<
  Contact & { new: boolean; newEmails: NewEmail[] }
>;

export const isValidEmailAddress = (email: string): boolean =>
  /^\S+@\S+\.\S+$/.test(email);

export const isValidContact = (contact: EditingContact): boolean => {
  return (
    Boolean(contact.firstName) &&
    Boolean(contact.lastName) &&
    (!Array.isArray(contact.emails) ||
      contact.emails.every(isValidEmailAddress))
  );
};

export type ContactRequest = Omit<Contact, 'id'>;

export const prepareContactForRequest = (
  editingContact: EditingContact
): ContactRequest => {
  const { firstName, lastName, emails, newEmails } = editingContact;

  return {
    firstName: firstName || '',
    lastName: lastName || '',
    emails: [
      ...(emails || []),
      ...(newEmails?.map((newEmail) => newEmail.email) || []),
    ],
  };
};

export enum ActionType {
  ContactsLoaded,
  ContactNew,
  ContactSelect,
  ContactSet,
  Error,
  LoadingStarted,
  LoadingFinished,
  EditorDirty,
  DeleteStarted,
  DeleteFinished,
  SaveStarted,
  SaveFinished,
  SaveCanceled,
  TriedToSave,
}

export type BasicAction =
  | {
      type:
        | ActionType.Error
        | ActionType.ContactNew
        | ActionType.LoadingStarted
        | ActionType.LoadingFinished
        | ActionType.EditorDirty
        | ActionType.DeleteStarted
        | ActionType.SaveStarted
        | ActionType.SaveCanceled
        | ActionType.TriedToSave;
    }
  | {
      type: ActionType.ContactsLoaded;
      contacts: Contact[];
    }
  | {
      type: ActionType.ContactSelect;
      id: number | undefined;
    }
  | {
      type: ActionType.ContactSet;
      contact: EditingContact;
    }
  | {
      type: ActionType.DeleteFinished;
      id: number;
    }
  | {
      type: ActionType.SaveFinished;
      contact: Contact;
    };

export type AppThunkAction = ThunkAction<void, AppState, unknown, BasicAction>;
