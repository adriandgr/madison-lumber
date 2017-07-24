import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { loadState, saveState } from '../utils/localStorage';
import api from '../utils/api';
import SiteHeader from './SiteHeader';
import Home from './Home';
import Mills from './Mills';
import Mill from './Mill';
import CreateMill from './CreateMill';
import BulkImport from './BulkImport';
import Users from './Users';
import CreateUser from './CreateUser';
import Login from './Login';
import AlertMessages from './AlertMessages';
import './App.css';

const AppRoutes = (props) => (
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
    <Route render={ () => (
      <div className="container">
        <AlertMessages
          success={[]}
          errors={[
            '404 - Not Found',
            'The page you are looking for has been moved or doesn\'t exist anymore.']}
        />
        <Link to="/" className="btn btn-lg btn-default center-block"><i className="fa fa-undo" aria-hidden="true"></i> Take me home</Link>
      </div>)
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
          <footer id="site-footer">
            Copyright &copy; 2017 <a href="http://www.ketadesign.ca/">
              KetaDesign Productions Inc.
            </a>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
