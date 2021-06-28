import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import contactsReducer from './reducers/contacts';
import errorReducer from './reducers/error';
import loadingReducer from './reducers/loading';
import { BasicAction } from './types';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  error: errorReducer,
  loading: loadingReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): ThunkDispatch<AppState, never, BasicAction> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
