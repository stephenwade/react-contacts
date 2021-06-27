import { Reducer } from 'react';
import { Action, ActionType, State } from '../types';

export const defaultState : State = {
  contacts: [],
  error: false,
};

export const reducer : Reducer<State, Action> = (state: State, action: Action) : State => {
  switch (action.type) {
    case ActionType.Error:
      return {...state, error: true};

    case ActionType.LoadContacts:
      return {...state, contacts: action.contacts};
  }
};
