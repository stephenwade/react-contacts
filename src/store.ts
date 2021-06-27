import { Dispatch } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import contactsReducer from './reducers/contacts';
import errorReducer from './reducers/error';
import { Action } from './types.js';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  error: errorReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): Dispatch<Action> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
