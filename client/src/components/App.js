import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadState, saveState } from '../utils/localStorage';

import api from '../utils/api';
import './assets/App.css';

import SiteHeader from './shared/SiteHeader';
import Footer from './shared/Footer';

import LoadingBar from './LoadingBar';

import AppRoutes from './AppRoutes';


/////////
/// App
/////////

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenStatus: 'INIT',
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
      this.setState({ tokenStatus: 'COMPLETE' });
      return;
    }
    const localToken = loadState().token
    if (!this.state.token && localToken) {
      this.authWithToken(localToken);
    } else {
      // tokenStatus is maybe not the best name; this variable is more keeping track of
      // when the process of checking on the token completes so other stuff can render
      // accordingly (eg. navbar links)
      this.setState({ tokenStatus: 'COMPLETE' });
    }
  }

  authWithToken(token) {
    this.setState({ tokenStatus: 'LOADING' });
    return api.validateToken(token).then( res => {
      this.authUser(res.token, res.user, res.isAdmin);
      this.forceUpdate();
    });
  }

  authUser(token, userName, isAdmin, redirectTo) {
    this.setState(()=> ({
      tokenStatus: 'COMPLETE',
      isAuthenticated: true,
      token,
      userName,
      isAdmin,
      successAuth: ['Login Successful.', `Welcome back, ${userName}! ${redirectTo}`]
    }));

    saveState({
      token
    });
  }

  logoutUser() {
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
            tokenStatus={this.state.tokenStatus}
            isAuthenticated={this.state.isAuthenticated}
            logoutUser={this.logoutUser}/>
          {this.state.tokenStatus === 'COMPLETE' ? (
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
            <div className='loading-bar'>
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
