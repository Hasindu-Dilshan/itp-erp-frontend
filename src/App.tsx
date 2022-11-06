import React from 'react';

import './App.css';
import Signin from './components/auth/Signin';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/auth/SignUp';
import Home from './components/dashboard/home';

function App() {
  return (
    <div className="App">
      <Dashboard/>
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
