import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'universal-cookie';

import api from '../utils/api';
import './assets/App.css';

import SiteHeader from './shared/SiteHeader';
import Footer from './shared/Footer';
import LoadingBar from './LoadingBar';
import AppRoutes from './AppRoutes';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authWithTokenStatus: 'INIT',
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      userName: '',
      successAuth: [],
    };
    this.authUser = this.authUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount() {
    const cookies = new Cookies();
    // cookies.set('session_id', null, { path: '/', maxAge: 86400 });

    const localToken = cookies.get('session_id') || null;
    if (localToken) {
      this.authWithToken(localToken);
    } else {
      this.setState({ authWithTokenStatus: 'COMPLETE' });
    }
  }

  authWithToken(token) {
    this.setState({ authWithTokenStatus: 'LOADING' });
    return api.validateToken(token).then((res) => {
      this.authUser(res.token, res.user, res.isAdmin);
      this.forceUpdate();
    }).catch(() => this.setState({ authWithTokenStatus: 'COMPLETE' }));
  }

  authUser(token, userName, isAdmin, redirectTo) {
    const cookies = new Cookies();
    this.setState(() => ({
      authWithTokenStatus: 'COMPLETE',
      isAuthenticated: true,
      token,
      userName,
      isAdmin,
      successAuth: ['Login Successful.', `Welcome back, ${userName}! ${redirectTo}`],
    }));
    console.log('authUser')
    cookies.set('session_id', token, { path: '/', maxAge: 86400 });
  }

  logoutUser() {
    const cookies = new Cookies();
    this.setState(() => ({
      isAuthenticated: false,
      isAdmin: false,
      token: null,
      userName: '',
      successAuth: ['Logout Successful.', `See you later, ${this.state.userName}.`],
    }));
    
    cookies.remove('session_id', { path: '/' });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SiteHeader
            authWithTokenStatus={this.state.authWithTokenStatus}
            isAuthenticated={this.state.isAuthenticated}
            logoutUser={this.logoutUser}
          />
          {this.state.authWithTokenStatus === 'COMPLETE' ? (
            <main id="site-main">
              <AppRoutes
                successAuth={this.state.successAuth}
                authUser={this.authUser}
                isAuthenticated={this.state.isAuthenticated}
                isAdmin={this.state.isAdmin}
                token={this.state.token}
              />
            </main>
          ) : (
            <div className="loading-bar">
              <LoadingBar />
            </div>
          )}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
