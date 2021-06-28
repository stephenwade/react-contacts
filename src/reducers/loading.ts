import { Reducer } from 'redux';

import { ActionType, BasicAction } from '../types';

const loadingReducer: Reducer<boolean, BasicAction> = (
  state = false,
  action
) => {
  switch (action.type) {
    case ActionType.LoadingStarted:
      return true;

    case ActionType.LoadingFinished:
      return false;
  }

  return state;
};

export default loadingReducer;
