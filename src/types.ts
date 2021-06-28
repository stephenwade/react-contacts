import { ThunkAction } from 'redux-thunk';

import { AppState } from './store';

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  emails: string[];
};

export enum ActionType {
  ContactsLoaded,
  ContactSelect,
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
      id: number;
    };

export type AppThunkAction = ThunkAction<void, AppState, unknown, BasicAction>;
