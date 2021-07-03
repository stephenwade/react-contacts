import { ActionType, BasicAction } from '../types';

export const error = (): BasicAction => ({
  type: ActionType.Error,
});

export const clearError = (): BasicAction => ({
  type: ActionType.ErrorClear,
});
