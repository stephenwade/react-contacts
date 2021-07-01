import { Reducer } from 'redux';

import { ActionType, BasicAction, Contact, NewContact } from '../types';

const contactsReducer: Reducer<
  {
    contacts: Contact[];
    activeContact: NewContact | undefined;
  },
  BasicAction
> = (
  state = {
    contacts: [],
    activeContact: undefined,
  },
  action
) => {
  switch (action.type) {
    case ActionType.ContactsLoaded:
      return { ...state, contacts: action.contacts };

    case ActionType.ContactSelect: {
      const activeContact = state.contacts.find(
        (contact) => contact.id === action.id
      );
      return { ...state, activeContact };
    }

    case ActionType.ContactSet: {
      return {
        ...state,
        activeContact: { ...state.activeContact, ...action.contact },
      };
    }
  }

  return state;
};

export default contactsReducer;
