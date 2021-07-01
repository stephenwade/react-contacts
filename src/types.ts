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

export enum ActionType {
  ContactsLoaded,
  ContactNew,
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
        | ActionType.ContactNew
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
      contact: EditingContact;
    };

export type AppThunkAction = ThunkAction<void, AppState, unknown, BasicAction>;
