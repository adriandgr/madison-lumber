import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import Home from './Home';
import Login from './Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <SiteHeader/>
          <main id="site-main">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
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
