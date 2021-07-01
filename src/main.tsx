import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import App from './components/App';
import { AppState, store } from './store';
import { loadContacts } from './actions/contacts';
import { BasicAction } from './types';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

(store.dispatch as ThunkDispatch<AppState, never, BasicAction>)(loadContacts());

// TODO: Every 5 minutes, if the ContactEditor is not dirty, reload contacts
