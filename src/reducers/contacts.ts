import { Reducer } from 'redux';

import { ActionType, BasicAction, Contact, EditingContact } from '../types';

const contactsReducer: Reducer<
  {
    contacts: Contact[];
    activeContact: EditingContact | undefined;
    editorDirty: boolean;
    deleteInProgress: boolean;
    saveInProgress: boolean;
    hasTriedToSave: boolean;
  },
  BasicAction
> = (
  state = {
    contacts: [],
    activeContact: undefined,
    editorDirty: false,
    deleteInProgress: false,
    saveInProgress: false,
    hasTriedToSave: false,
  },
  action
) => {
  switch (action.type) {
    case ActionType.ContactsLoaded:
      return { ...state, contacts: action.contacts };

    case ActionType.ContactNew:
      if (!state.activeContact?.new) {
        return { ...state, activeContact: { new: true } };
      }
      return state;

    case ActionType.ContactSelect: {
      const activeContact = state.contacts.find(
        (contact) => contact.id === action.id
      );
      return { ...state, activeContact };
    }

    case ActionType.ContactSet:
      return {
        ...state,
        activeContact: { ...state.activeContact, ...action.contact },
      };

    case ActionType.EditorDirty:
      return { ...state, editorDirty: true };

    case ActionType.DeleteStarted:
      return { ...state, deleteInProgress: true };

    case ActionType.DeleteFinished:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id != action.id),
        deleteInProgress: false,
      };

    case ActionType.SaveStarted:
      return { ...state, saveInProgress: true };

    case ActionType.SaveFinished:
      return {
        ...state,
        contacts: [
          ...state.contacts.filter(
            (contact) => contact.id != action.contact.id
          ),
          action.contact,
        ],
        activeContact: action.contact,
        saveInProgress: false,
      };

    case ActionType.SaveCanceled:
      return { ...state, saveInProgress: false };

    case ActionType.TriedToSave:
      return { ...state, hasTriedToSave: true };
  }

  return state;
};

export default contactsReducer;
