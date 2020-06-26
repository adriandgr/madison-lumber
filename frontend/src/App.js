import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {UserContextProvider} from "./contexts/userContext"

import './App.scss';

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login/Login"


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <NavBar/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
        </Switch>
        <Footer/>
      </UserContextProvider>
    </div>
  );
}

export default App;
