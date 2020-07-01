import React, {useContext, useEffect} from 'react';
import Cookies from 'universal-cookie'
import {Switch, Route} from 'react-router-dom'
import {UserContext} from "./contexts/userContext"

import './App.scss';

import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login/Login"
import Mills from "./pages/Mills/Mills"
import Mill from "./pages/Mill/Mill"



function App() {
  const {token,validateToken, logout} = useContext(UserContext)

  useEffect(()=> {
    const cookies = new Cookies()
    const token = cookies.get('jwt')
    if (token) {
      validateToken(token)
    } else {
      logout()
    }
  }, [])

  return (
    <div className="container__app_root">
        <NavBar/>
        <div className="content__wrap">
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/login'>
              <Login/>
            </Route>
            <Route path='/mills'>
              <Mills/>
            </Route>
            <Route path='/mill/:mill_uuid'>
              <Mill/>
            </Route>
          </Switch>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
