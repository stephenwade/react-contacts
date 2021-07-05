import * as React from 'react';
import { useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Sidebar from './Sidebar';
import ContactEditor from './ContactEditor';
import { useAppDispatch, useAppSelector } from '../store';
import { loadContacts } from '../actions/contacts';

import './App.css';

function App(): JSX.Element {
  const error = useAppSelector((state) => state.error);
  const loading = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      toast.error(
        <span className="AppToastText">
          Something went wrong.
          <button onClick={() => window.location.reload()}>Reload</button>
        </span>,
        {
          duration: 5000,
          position: 'bottom-left',
          id: 'error',
        }
      );
    }
  }, [error]);

  useEffect(() => {
    dispatch(loadContacts());

    // This function should only run the first time the app loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Every 5 minutes, if the ContactEditor is not dirty, reload contacts

  return (
    <div className="App">
      <Toaster />
      <Sidebar
        loading={loading}
        onItemClicked={() => firstInputRef.current?.focus()}
      />
      <ContactEditor loading={loading} ref={firstInputRef} />
    </div>
  );
}

export default App;
