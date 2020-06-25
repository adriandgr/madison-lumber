import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'universal-cookie';

import api from './utils/api';
import './components/assets/App.css';

import SiteHeader from './components/shared/SiteHeader';
import Footer from './components/shared/Footer';
import LoadingBar from './components/LoadingBar';
import AppRoutes from './components/AppRoutes';

import './components/assets/App.css';
import UserContext from './components/users/UserContext';

interface State {
  authWithTokenStatus: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token?: string;
  userName: string;
  successAuth: any[];
};

type ContextProps = {
    authWithToken: object;
    authUser: object;
    logoutUser: object;
    authWithTokenStatus: string;
    isAuthenticated: boolean;
    isAdmin: boolean;
    token?: string;
    userName: string;
    successAuth: any[];
};

class App extends React.Component {
  // TODO: constrain ts type any to more narrow
  state = {
      authWithTokenStatus: 'INIT',
      isAuthenticated: false,
      isAdmin: false,
      firstName: null,
      token: null,
      userId: null,

    };
  login = (token: String, userId: String, firstName: String) => {
    this.setState({ token, userId, firstName });
  };
  logout = () => {
    this.setState({ token: null, userId: null, firstName: null });
  };
  componentDidMount() {
    const cookies = new Cookies();
    // cookies.set('session_id', null, { path: '/', maxAge: 86400 });

    const localToken = cookies.get('session_id') || null;
    if (localToken) {
      this.authWithToken(localToken);
    } else {
      this.setState({ authWithTokenStatus: 'COMPLETE' });
    }
  }

  authWithToken = (token: String) => {
    const cookies = new Cookies();
    this.setState({ authWithTokenStatus: 'LOADING' });
    return api.validateToken(token).then((res) => {
      // TODO: Fix cookie. context?
      this.authUser(res.data.login.token, res.data.login.firstName, res.data.login.isAdmin);
      this.forceUpdate();
    }).catch((err) => {
      this.setState({ authWithTokenStatus: 'COMPLETE' })
      if (err.response && err.response.data.errors[0].message === 'TOKEN_ERROR') {
        console.log(err.response.data.errors[0].message)
        cookies.remove('session_id', { path: '/' });
      }

    });
  }

  authUser = (token: String, firstName: String, isAdmin: Boolean, redirectTo?: String) => {
        const cookies = new Cookies();
        this.setState(() => ({
            authWithTokenStatus: 'COMPLETE',
            isAuthenticated: true,
            token,
            firstName,
            isAdmin,
            successAuth: ['Login Successful.', `Welcome back, ${firstName}!`],
        }));
        console.log('authUser')
        cookies.set('session_id', token, { path: '/', maxAge: 86400 });
    }

  logoutUser = () => {
    const cookies = new Cookies();
    this.setState(() => ({
        isAuthenticated: false,
        isAdmin: false,
        token: undefined,
        userName: '',
        successAuth: ['Logout Successful.', `See you later, ${this.state.firstName}.`],
    }));
    cookies.remove('session_id', { path: '/' });
  }

  render() {
    return (
      <Router>
        <UserContext.Provider value={{
          authWithTokenStatus: this.state.authWithTokenStatus,
          isAuthenticated: this.state.isAuthenticated,
          isAdmin: this.state.isAdmin,
          token: this.state.token,
          firstName: this.state.firstName,
          userId: this.state.userId,
          login: this.login,
          logoutUser: this.logoutUser,
          authWithToken: this.authWithToken,
          authUser: this.authUser
        }}>
          <div className="App">
            <SiteHeader
            />
            {this.state.authWithTokenStatus === 'COMPLETE' ? (
                <main id="site-main">
                  <AppRoutes />
                </main>
            ) : (
                <div className="loading-bar">
                  <LoadingBar />
                </div>
            )}
            <Footer />
          </div>
        </UserContext.Provider>
      </Router>
    );
  }
}
App.contextType = UserContext;

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
