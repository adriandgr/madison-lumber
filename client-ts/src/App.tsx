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
import UserStore from './components/users/UserContext';
import { UserContext } from './components/users/UserContext'

interface State {
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
  //
  authWithToken = (token: string) => {
    this.setState({ authWithTokenStatus: 'LOADING' });
    return api.validateToken(token).then((res) => {
      this.context.authUser(res.token, res.user, res.isAdmin);
      this.forceUpdate();
    }).catch(() => this.setState({ authWithTokenStatus: 'COMPLETE' }));
  }

  render() {
    return (
      <Router>
        <UserStore>
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
        </UserStore>
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
