import { Reducer } from 'redux';

import { Action, ActionType, Contact } from '../types';

const contactsReducer: Reducer<Contact[], Action> = (state = [], action) => {
  switch (action.type) {
    case ActionType.LoadContacts:
      return action.contacts;
  }

  return state;
};

export default contactsReducer;
