import { Reducer } from 'redux';

import { ActionType, BasicAction, Contact } from '../types';

const contactsReducer: Reducer<Contact[], BasicAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case ActionType.ContactsLoaded:
      return action.contacts;
  }

  return state;
};

export default contactsReducer;
