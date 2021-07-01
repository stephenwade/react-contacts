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

export type NewContact = Partial<Contact & { newEmails: NewEmail[] }>;

export enum ActionType {
  ContactsLoaded,
  ContactSelect,
  ContactSet,
  Error,
  LoadingStarted,
  LoadingFinished,
}

export type BasicAction =
  | {
      type:
        | ActionType.Error
        | ActionType.LoadingStarted
        | ActionType.LoadingFinished;
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
      contact: NewContact;
    };

export type AppThunkAction = ThunkAction<void, AppState, unknown, BasicAction>;
