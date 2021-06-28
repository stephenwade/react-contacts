import { Reducer } from 'redux';

import { ActionType, BasicAction, Contact } from '../types';

const contactsReducer: Reducer<
  {
    contacts: Contact[];
    activeId: number | null;
  },
  BasicAction
> = (
  state = {
    contacts: [],
    activeId: null,
  },
  action
) => {
  switch (action.type) {
    case ActionType.ContactsLoaded:
      return { ...state, contacts: action.contacts };

    case ActionType.ContactSelect:
      return { ...state, activeId: action.id };
  }

  return state;
};

export default contactsReducer;
