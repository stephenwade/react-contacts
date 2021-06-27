import { Reducer } from 'redux';

import { ActionType, BasicAction } from '../types';

const errorReducer: Reducer<boolean, BasicAction> = (state = false, action) => {
  switch (action.type) {
    case ActionType.Error:
      return true;
  }

  return state;
};

export default errorReducer;
