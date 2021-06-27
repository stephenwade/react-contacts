import { ActionType, BasicAction } from '../types';

export const error = (): BasicAction => ({
  type: ActionType.Error,
});
