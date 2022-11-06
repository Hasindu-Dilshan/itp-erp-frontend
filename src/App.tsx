import React, { useState, useEffect } from 'react';

import './App.css';
import Signin from './components/auth/Signin';
import Dashboard from './components/dashboard/Dashboard';
import Signin from './components/auth/Signin';
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
<<<<<<< HEAD
      
      <Signin /> 
=======
<<<<<<< HEAD
      <Dashboard/>
      {/* <SignUp /> */}
=======
      {
        loggedIn ? <Dashboard stateChanger={stateChanger} /> : userLoggedIn === "NOT_LOGGED_IN" ? <Signin stateChanger={() => { stateChanger() }} /> : userLoggedIn === "SIGNUP" ? <SignUp stateChanger={() => { stateChanger() }} /> : <Dashboard stateChanger={() => { stateChanger() }} />
      }
>>>>>>> 54a0771b8398f572a47d1b8c3ddd9812b9d4cd98
>>>>>>> ef1de16b156b209ba323303ce796d33e1b825c79
    </div>
  );
}

export default App;
