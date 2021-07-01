import { Reducer } from 'redux';

import { ActionType, BasicAction, Contact, EditingContact } from '../types';

const contactsReducer: Reducer<
  {
    contacts: Contact[];
    activeContact: EditingContact | undefined;
    deleteInProgress: boolean;
  },
  BasicAction
> = (
  state = {
    contacts: [],
    activeContact: undefined,
    deleteInProgress: false,
  },
  action
) => {
  switch (action.type) {
    case ActionType.ContactsLoaded:
      return { ...state, contacts: action.contacts };

    case ActionType.ContactNew: {
      if (!state.activeContact?.new) {
        return { ...state, activeContact: { new: true } };
      }
      return state;
    }

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

    case ActionType.DeleteStarted: {
      return { ...state, deleteInProgress: true };
    }

    case ActionType.DeleteFinished: {
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.id),
        deleteInProgress: false,
      };
    }
  }

  return state;
};

export default contactsReducer;
