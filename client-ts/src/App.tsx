import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Cookies from 'universal-cookie';

import api from './utils/api';
import './components/assets/App.css';

import SiteHeader from './components/shared/SiteHeader';
import Footer from './components/shared/Footer';
import LoadingBar from './components/LoadingBar';
import AppRoutes from './components/AppRoutes';


import './components/assets/App.css';

interface State {
  authWithTokenStatus: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token?: string;
  userName: string;
  successAuth: any[];
};

class App extends React.Component<{}, State> {
  // TODO: constrain ts type any to more narrow
  constructor(props: any) {
    super(props);
    this.state = {
      authWithTokenStatus: 'INIT',
      isAuthenticated: false,
      isAdmin: false,
      token: undefined,
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

  authWithToken(token: string) {
    this.setState({ authWithTokenStatus: 'LOADING' });
    return api.validateToken(token).then((res) => {
      this.authUser(res.token, res.user, res.isAdmin);
      this.forceUpdate();
    }).catch(() => this.setState({ authWithTokenStatus: 'COMPLETE' }));
  }

  authUser(token: string, userName: string, isAdmin: boolean, redirectTo?: string) {
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
      token: undefined,
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





// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
