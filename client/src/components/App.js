import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { loadState, saveState } from '../utils/localStorage';
import api from '../utils/api';
import SiteHeader from './SiteHeader';
import Home from './Home';
import Mills from './Mills';
import Mill from './Mill';
import CreateMill from './CreateMill';
import Users from './Users';
import CreateUser from './CreateUser';
import Login from './Login';
import AlertMessages from './AlertMessages';
import './App.css';

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

  logoutUser(cb) {
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
    cb;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SiteHeader
            isAuthenticated={this.state.isAuthenticated}
            logoutUser={this.logoutUser}/>
          <main id="site-main">
            <Switch>
              <Route exact path='/' render={(props) => (
                <Home {...props} success={this.state.successAuth} />
              )}/>
              <Route path='/login' render={(props) => (
                <Login {...props} onSubmit={this.authUser} />
              )}/>
              <Route exact path='/mills' render={(props) => (
                <Mills {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  token={this.state.token} />
              )}/>
              <Route exact path='/mills/new' render={(props) => (
                <CreateMill {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  token={this.state.token} />
              )}/>
              <Route exact path='/mills/:mill' render={(props) => (
                <Mill {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  token={this.state.token} />
              )}/>
              <Route exact path='/users' render={(props) => (
                <Users {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  token={this.state.token} />
              )}/>
              <Route exact path='/users/new' render={(props) => (
                <CreateUser {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  token={this.state.token} />
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
