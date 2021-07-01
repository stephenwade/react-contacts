import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Sidebar from './Sidebar';
import ContactEditor from './ContactEditor';
import { useAppSelector } from '../store';

import './App.css';

function App(): JSX.Element {
  const error = useAppSelector((state) => state.error);
  const loading = useAppSelector((state) => state.loading);

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

  return (
    <div className="App">
      <Toaster />
      <Sidebar loading={loading} />
      <ContactEditor loading={loading} />
    </div>
  );
}

export default App;
