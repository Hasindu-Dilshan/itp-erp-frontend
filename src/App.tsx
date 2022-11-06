import React, { useState, useEffect } from 'react';

import './App.css';
import Signin from './components/auth/Signin';
import Dashboard from './components/dashboard/Dashboard';

import SignUp from './components/auth/SignUp';
import { reactLocalStorage } from 'reactjs-localstorage';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState<string>("NOT_LOGGED_IN");


  const stateChanger = () => {
    if (userLoggedIn === "NOT_LOGGED_IN") {
      setUserLoggedIn("HOME")
    }
    if (userLoggedIn === "LOGIN") {
      setUserLoggedIn("SIGNUP")
    }
    if (userLoggedIn === "SIGNUP") {
      setUserLoggedIn("LOGIN")
    }
  }
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const a = reactLocalStorage.get('kog', false);
    setLoggedIn(a)
  }, [])

  return (
    <div className="App">

      
   
      {
        loggedIn ? <Dashboard stateChanger={stateChanger} /> : userLoggedIn === "NOT_LOGGED_IN" ? <Signin stateChanger={() => { stateChanger() }} /> : userLoggedIn === "SIGNUP" ? <SignUp stateChanger={() => { stateChanger() }} /> : <Dashboard stateChanger={() => { stateChanger() }} />
      }

    </div>
  );
}

export default App;
