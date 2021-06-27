import React, { useEffect, useState } from 'react';

import { Contact } from './types';

import './App.css';

const CONTACTS_ENDPOINT = 'https://avb-contacts-api.herokuapp.com/contacts';

function App(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const result = await fetch(CONTACTS_ENDPOINT);
        if (!result.ok) {
          setError(true);
          return;
        }

        const json = (await result.json()) as Contact[];
        setContacts(json);
      } catch {
        setError(true);
      }
    };

    getContacts();
  }, []);

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
