import React from 'react';
import './App.css';
import UserTable from './components/UserTable'; // Importujesz komponent

const App: React.FC = () => {
  return (
      <div className="App">
        <h1>User Management</h1>
        <UserTable /> {/* Używasz komponentu UserTable */}
      </div>
  );
}

export default App;
