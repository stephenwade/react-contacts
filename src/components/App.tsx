import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { ActionType, Contact } from '../types';

import './App.css';

const CONTACTS_ENDPOINT = 'https://avb-contacts-api.herokuapp.com/contacts';

function App(): JSX.Element {
  const contacts = useAppSelector((state) => state.contacts);
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const result = await fetch(CONTACTS_ENDPOINT);
        if (!result.ok) {
          dispatch({ type: ActionType.Error });
          return;
        }

        const contacts = (await result.json()) as Contact[];
        dispatch({ type: ActionType.LoadContacts, contacts });
      } catch {
        dispatch({ type: ActionType.Error });
      }
    };

    getContacts();
  }, [dispatch]);

  return (
    <div className="App">
      {error ? (
        'Something went wrong!'
      ) : (
        <pre>{JSON.stringify(contacts, undefined, 2)}</pre>
      )}
    </div>
  );
}

export default App;
