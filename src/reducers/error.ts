import { Reducer } from 'redux';

import { Action, ActionType } from '../types';

const errorReducer: Reducer<boolean, Action> = (state = false, action) => {
  switch (action.type) {
    case ActionType.Error:
      return true;
  }

  return state;
};

export default errorReducer;
