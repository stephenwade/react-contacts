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
      {/* TODO: Add loading spinner */}
      {loading && <h2>Loading</h2>}
      <Sidebar />
      <ContactEditor />
      {/* TODO: Add error snackbar */}
      {error && <h2>Error</h2>}
    </div>
  );
}

export default App;
