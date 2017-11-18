import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Static components
import Home from './Home';
import Login from './Login';
import Register from './Register';

// User components
import Users from './users/Users';
import CreateUser from './users/CreateUser';
import ManageUser from './users/ManageUser';

// Mill components
import Mills from './mills/Mills';
import Mill from './mills/Mill';
import CreateMill from './mills/CreateMill';
import BulkImport from './mills/BulkImport';

import AlertMessages from './shared/AlertMessages';


///////////////
/// App Routes
///////////////

const AppRoutes = props => (
  <Switch>
    <Route
      exact
      path='/'
      render={routerProps => (
        <Home {...routerProps}
        success={props.successAuth} />
    )}/>
    <Route
      path='/login'
      render={routerProps => (
        <Login {...routerProps}
        isAuthenticated={props.isAuthenticated}
        onSubmit={props.authUser} />
    )}/>
    <Route
      path='/register'
      render={routerProps => (
        <Register {...routerProps}
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          token={props.token} />
    )}/>
    <Route
      exact
      path='/mills'
      render={routerProps => (
        <Mills {...routerProps}
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          token={props.token} />
    )}/>
    <Route
      exact
      path='/mills/new'
      render={routerProps => (
        <CreateMill {...routerProps}
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          token={props.token} />
    )}/>
    <Route
      exact
      path='/mills/import'
      render={routerProps => (
        <BulkImport {...routerProps}
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          token={props.token} />
    )}/>
    <Route
      exact
      path='/mills/:mill'
      render={routerProps => (
        <Mill {...routerProps}
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          token={props.token} />
    )}/>
    <Route
      exact
      path='/users'
      render={routerProps => (
        <Users {...routerProps}
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          token={props.token} />
    )}/>
    <Route
      exact
      path='/users/new'
      render={routerProps => (
        <CreateUser {...routerProps}
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          token={props.token} />
    )}/>
    <Route
      exact
      path='/users/:uuid'
      render={routerProps => (
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
        </div>
      );
    }
    } />
  </Switch>
);

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  token: PropTypes.string,
  authUser: PropTypes.func.isRequired
}

export default AppRoutes;
