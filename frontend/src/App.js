import React, {useContext, useEffect} from 'react';
import Cookies from 'universal-cookie'
import {Switch, Route} from 'react-router-dom'
import {UserContext} from "./contexts/userContext"

import './App.scss';

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login/Login"



function App() {
  const {token,validateToken} = useContext(UserContext)

  useEffect(()=> {
    const cookies = new Cookies()
    const token = cookies.get('jwt')
    if (token) {
      console.log('TOKE', token)
      validateToken(token)
    }
  }, [])

  // useEffect(()=> {
  //   if (token) {
  //     validateToken()
  //   }
  // }, [token])
  return (
    <div className="App">
      
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
      
    </div>
  );
}

export default App;
