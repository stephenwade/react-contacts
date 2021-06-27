import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';
import { loadContacts } from '../actions/contacts';

import './App.css';

function App(): JSX.Element {
  const contacts = useAppSelector((state) => state.contacts);
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  // This effect will only run the first time the component is rendered
  useEffect(() => {
    dispatch(loadContacts());
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
