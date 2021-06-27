import React, { useEffect, useReducer } from 'react';
import {defaultState, reducer} from '../store/reducer';

import { ActionType, Contact } from '../types';

import './App.css';

const CONTACTS_ENDPOINT = 'https://avb-contacts-api.herokuapp.com/contacts';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    const getContacts = async () => {
      try {
        const result = await fetch(CONTACTS_ENDPOINT);
        if (!result.ok) {
          dispatch({type: ActionType.Error});
          return;
        }

        const contacts = (await result.json()) as Contact[];
        dispatch({type: ActionType.LoadContacts, contacts})
      } catch {
        dispatch({type: ActionType.Error});
      }
    };

    getContacts();
  }, []);

  return (
    <div className="App">
      {state.error ? (
        'Something went wrong!'
      ) : (
        <pre>{JSON.stringify(state.contacts, undefined, 2)}</pre>
      )}
    </div>
  );
}

export default App;
