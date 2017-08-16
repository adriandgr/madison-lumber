import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { loadState, saveState } from '../utils/localStorage';
import PropTypes from 'prop-types';
import api from '../utils/api';
import './assets/App.css';

import Home from './Home';
import Login from './Login';

// User components
import Users from './users/Users';
import CreateUser from './users/CreateUser';
import ManageUser from './users/ManageUser';

// Mill components
import Mills from './mills/Mills';
import Mill from './mills/Mill';
import CreateMill from './mills/CreateMill';
import BulkImport from './mills/BulkImport';

// Shared components
import SiteHeader from './shared/SiteHeader';
import AlertMessages from './shared/AlertMessages';
import Footer from './shared/Footer';


const AppRoutes = props => (
  <Switch>
    <Route exact path='/' render={(routerProps) => (
      <Home {...routerProps} success={props.successAuth} />
    )}/>
    <Route path='/login' render={(routerProps) => (
      <Login {...routerProps} onSubmit={props.authUser} />
    )}/>
    <Route exact path='/mills' render={(routerProps) => (
      <Mills {...routerProps}
        isAuthenticated={props.isAuthenticated}
        isAdmin={props.isAdmin}
        token={props.token} />
    )}/>
    <Route exact path='/mills/new' render={(routerProps) => (
      <CreateMill {...routerProps}
        isAuthenticated={props.isAuthenticated}
        isAdmin={props.isAdmin}
        token={props.token} />
    )}/>
    <Route exact path='/mills/import' render={(routerProps) => (
      <BulkImport {...routerProps}
        isAuthenticated={props.isAuthenticated}
        isAdmin={props.isAdmin}
        token={props.token} />
    )}/>
    <Route exact path='/mills/:mill' render={(routerProps) => (
      <Mill {...routerProps}
        isAuthenticated={props.isAuthenticated}
        isAdmin={props.isAdmin}
        token={props.token} />
    )}/>
    <Route exact path='/users' render={(routerProps) => (
      <Users {...routerProps}
        isAuthenticated={props.isAuthenticated}
        isAdmin={props.isAdmin}
        token={props.token} />
    )}/>
    <Route exact path='/users/new' render={(routerProps) => (
      <CreateUser {...routerProps}
        isAuthenticated={props.isAuthenticated}
        isAdmin={props.isAdmin}
        token={props.token} />
    )}/>
    <Route exact path='/users/:uuid' render={(routerProps) => (
      <ManageUser {...routerProps}
        isAuthenticated={props.isAuthenticated}
        isAdmin={props.isAdmin}
        token={props.token} />
    )}/>
    <Route render={ () => {
      return (
      <div className="container">
        <AlertMessages
          success={[]}
          errors={[
            '404 - Not Found',
            'The page you are looking for has been moved or doesn\'t exist anymore.']}
        />
        <Link to="/" className="btn btn-lg btn-default center-block"><i className="fa fa-undo" aria-hidden="true"></i> Take me home</Link>
      </div>)}
    } />
  </Switch>
)

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  token: PropTypes.string,
  authUser: PropTypes.func.isRequired
}

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
