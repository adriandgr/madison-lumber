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

const AppRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/' render={routerProps => <Home {...routerProps} /> }/>
    <Route exact path='/login' render={routerProps => <Login {...routerProps} /> }/>
    <Route exact path='/register' render={routerProps => <Register {...routerProps} /> }/>
    <Route exact path='/mills' render={routerProps => <Mills {...routerProps} /> }/>
    <Route exact path='/mills/new' render={routerProps => <CreateMill {...routerProps} /> }/>
    <Route exact path='/mills/import' render={routerProps => <BulkImport {...routerProps} /> }/>
    <Route exact path='/mills/:mill' render={routerProps => <Mill {...routerProps} /> }/>
    <Route exact path='/users' render={routerProps => <Users {...routerProps} /> }/>
    <Route exact path='/users/new' render={routerProps => <CreateUser {...routerProps} /> }/>
    <Route exact path='/users/:uuid' render={routerProps => <ManageUser {...routerProps} /> }/>
    <Route render={() => <NotFound />} />
  </Switch>
);

const NotFound = () => (
    <div className="container">
        <AlertMessages
            success={[]}
            error={[
                '404 - Not Found',
                'The page you are looking for has been moved or doesn\'t exist anymore.']}
        />
        <Link to="/" className="btn btn-lg btn-default center-block">
            <i className="fa fa-undo" aria-hidden="true"></i> Take me home
        </Link>
    </div>
);

export default AppRoutes;
