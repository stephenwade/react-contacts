import React from 'react';

import Sidebar from './Sidebar';
import ContactEditor from './ContactEditor';
import { useAppSelector } from '../store';

import './App.css';

function App(): JSX.Element {
  const error = useAppSelector((state) => state.error);
  const loading = useAppSelector((state) => state.loading);

  return (
    <div className="App">
      <Sidebar />
      <ContactEditor loading={loading} />
      {/* TODO: Add error snackbar */}
      {error && <h2>Error</h2>}
    </div>
  );
}

export default App;
