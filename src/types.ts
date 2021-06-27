export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  emails: string[];
};

export enum ActionType {
  Error,
  LoadContacts,
}

export type Action =
  | {
      type: ActionType.Error;
    }
  | {
      type: ActionType.LoadContacts;
      contacts: Contact[];
    };
