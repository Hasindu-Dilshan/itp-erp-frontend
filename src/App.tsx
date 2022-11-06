import React, { useState } from 'react';

import './App.css';
//import Signin from './components/auth/Signin';
import Dashboard from './components/dashboard/Dashboard';
import Signin from './components/auth/Signin';
import SignUp from './components/auth/SignUp';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<string>("NOT_LOGGED_IN");

  const stateChanger = () => {
    if (userLoggedIn === "NOT_LOGGED_IN") {
      setUserLoggedIn("SIGNUP")
    }
    if (userLoggedIn === "LOGIN") {
      setUserLoggedIn("SIGNUP")
    }
    if (userLoggedIn === "SIGNUP") {
      setUserLoggedIn("LOGIN")
    }
  }
  return (
    <div className="App">
      {/* {
        userLoggedIn === "NOT_LOGGED_IN" ? <Signin stateChanger={() => { stateChanger() }} /> : userLoggedIn === "SIGNUP" ? <SignUp stateChanger={() => { stateChanger() }} /> : <Dashboard stateChanger={() => { stateChanger() }} />
      } */}
      <Dashboard stateChanger={stateChanger} />
    </div>
  );
}

export default App;
