import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import api from '../utils/api';
import SiteHeader from './SiteHeader';
import Home from './Home';
import Mills from './Mills';
import Login from './Login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAdmin: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNTk1MTVmNTkyYWM3YmJhMDAxNjI2MTE4Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiY3JlYXRlZCI6ImluaXQiLCJhY2NvdW50VHlwZSI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJfX3YiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibGFzdE5hbWUiOiJpbml0IiwiZmlyc3ROYW1lIjoiaW5pdCIsInV1aWQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJjcmVhdGVkIjp0cnVlLCJhY2NvdW50VHlwZSI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibGFzdE5hbWUiOnRydWUsImZpcnN0TmFtZSI6dHJ1ZSwidXVpZCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwicGF0aHNUb1Njb3BlcyI6e30sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJjcmVhdGVkIjoiMjAxNy0wNi0yNlQxOToyNDowOS44NDJaIiwiYWNjb3VudFR5cGUiOiJkZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZSwiX192IjowLCJwYXNzd29yZCI6ImRldiIsImVtYWlsIjoibWUiLCJsYXN0TmFtZSI6IkRpYXoiLCJmaXJzdE5hbWUiOiJBZHJpYW4iLCJ1dWlkIjoicjF6dnkxMUViIiwiX2lkIjoiNTk1MTVmNTkyYWM3YmJhMDAxNjI2MTE4In0sIiRpbml0Ijp0cnVlLCJpYXQiOjE1MDA1MDE2MTEsImV4cCI6MTUwMDU4ODAxMX0.T_Ulxw--ySwCf1R9kwBY1UGgySe3tRuFM8aAVb7rCoo',
      userName: '',
    }
    this.authUser = this.authUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }
  componentDidMount() {
    this.updateToken(this.state.validToken);
  }
  updateToken(token) {
    if(token) {
      console.log('you got a token')
      return
    }
    api.fetchToken().then( res => {
      console.log(res)
    })
  }

  authUser(token, userName) {
    this.setState(()=> ({
      isAuthenticated: true,
      token,
      userName
    }));
  }

  logoutUser(cb) {
    this.setState(() => ({
      isAuthenticated: false,
      token: null,
      userName: ''
    }))
    cb
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SiteHeader user={this.state.userName} logoutUser={this.logoutUser}/>
          <main id="site-main">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' render={(props) => (
                <Login {...props} onSubmit={this.authUser} />
              )}/>
              <Route path='/mills' render={(props) => (
                <Mills {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  isAdmin={this.state.isAdmin}
                  token={this.state.token} />
              )}/>
              <Route render={ () => <p><strong>404 - Not Found</strong></p> } />
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
