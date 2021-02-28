import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import navbarLogo from '../assets/madison-logo-small.png';

import { UserContext } from '../users/UserContext'


const LogoutButton = props => (
      <Link to="#" onClick={props.handleSubmit}>
        <i className="fa fa-sign-out" aria-hidden="true"></i> logout
      </Link>
);

LogoutButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const UsersButton = props => {
  if (props.isAdmin) {
    return (
      <li>
        <NavLink to="/users" activeClassName="active-link">
          <i className="fa fa-users" aria-hidden="true" /> Users
        </NavLink>
      </li>
    );
  }
  return null;
};

UsersButton.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

const NavBar = (props) => {
  if (props.isAuthenticated) {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <NavLink to="/mills" activeClassName="active-link">
            <i className="fa fa-database" aria-hidden="true" /> Mills
          </NavLink>
        </li>
        <UsersButton isAdmin={props.isAdmin}/>
        <li>
          <LogoutButton handleSubmit={props.handleSubmit} />
        </li>
      </ul>
    );
  }
  return (
    <ul className="nav navbar-nav">
      <li>
        <NavLink to="/login" activeClassName="active-link">
          <i className="fa fa-sign-in" aria-hidden="true" /> Login
        </NavLink>
      </li>
    </ul>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};


class SiteHeader extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push('/');
        this.context.logoutUser();
    }

    render() {
        return (
            <UserContext.Consumer>
                {props => (
                    <header id="site-header">
                        <div className="navbar navbar-expand-lg navbar-dark">
                            <div className="container-fluid">
                                
                              <NavLink to="/" className="navbar-brand">
                                  <img src={navbarLogo} alt="Madison's Lumber" className="navbar-logo" /> Madison's Lumber
                              </NavLink>

                              {props.authWithTokenStatus === 'COMPLETE' &&
                              <NavBar
                                  handleSubmit={this.handleSubmit}
                                  isAuthenticated={props.isAuthenticated}
                                  isAdmin={props.isAdmin}
                              />}
                            </div>
                        </div>
                    </header>
                )}
            </UserContext.Consumer>
    );
  }
}

SiteHeader.contextType = UserContext;

SiteHeader.propTypes = {
  authWithTokenStatus: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default withRouter(SiteHeader);