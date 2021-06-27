import { ActionType, BasicAction } from '../types';

export const loadingStarted = (): BasicAction => ({
  type: ActionType.LoadingStarted,
});

export const loadingFinished = (): BasicAction => ({
  type: ActionType.LoadingFinished,
});
