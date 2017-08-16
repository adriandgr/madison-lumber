import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { loadState, saveState } from '../utils/localStorage';
import PropTypes from 'prop-types';
import api from '../utils/api';
import './assets/App.css';

import SiteHeader from './shared/SiteHeader';
import Footer from './shared/Footer';

import AppRoutes from './AppRoutes';


/////////
/// App
/////////

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      userName: '',
      successAuth: []
    }
    this.authUser = this.authUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }
  componentWillMount() {
    if (!loadState()) {
      return;
    }
    const localToken = loadState().token
    if (!this.state.token && localToken) {
      this.authWithToken(localToken);
    }
  }

  authWithToken(token) {
    return api.validateToken(token).then( res => {
      this.authUser(res.token, res.user, res.isAdmin);
      this.forceUpdate()
    });
  }

  authUser(token, userName, isAdmin) {
    this.setState(()=> ({
      isAuthenticated: true,
      token,
      userName,
      isAdmin,
      successAuth: ['Login Successful.', `Welcome back, ${userName}!`]
    }));

    saveState({
      token
    });
  }

  logoutUser() {
    console.log('logmeout')
    this.setState(() => ({
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      userName: '',
      successAuth: ['Logout Successful.', `See you later, ${this.state.userName}.`]
    }))
    saveState({
      token: null
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SiteHeader
            isAuthenticated={this.state.isAuthenticated}
            logoutUser={this.logoutUser}/>
          <main id="site-main">
            <AppRoutes
              successAuth={this.state.successAuth}
              authUser={this.authUser}
              isAuthenticated={this.state.isAuthenticated}
              isAdmin={this.state.isAdmin}
              token={this.state.token}
            />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
