import React, { Component } from 'react'
import api from '../utils/api';
import { loadState, saveState } from '../utils/localStorage';
import LoadingBar from './LoadingBar';

function Auth(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
        token: null,
        test: 'test'
      };
      this.authUser = this.authUser.bind(this)
    }

    componentWillMount() {
      if (!loadState()) {
        return;
      }
      const localToken = loadState().token;
      if (!this.state.token && localToken) {
        this.authWithToken(localToken);
      }
    }

    authWithToken(token) {
      return api.validateToken(token).then(res => {
        this.authUser(res.token, res.user, res.isAdmin);
        this.forceUpdate();
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

    render() {
      if(this.state.isAuthenticated) {
        return <WrappedComponent {...this.state} {...this.props} />;
      } else {
        return (
          <div className="loading-bar">
            <LoadingBar />
          </div>
        );
      }
    }
  }
}

export default Auth;