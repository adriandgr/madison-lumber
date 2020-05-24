import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import navbarLogo from '../assets/madison-logo-small.png';

const LogoutButton = props => (
  <Link to="#" onClick={props.handleSubmit}>
    <i className="fa fa-sign-out" aria-hidden="true"></i> logout
  </Link>
);

LogoutButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const NavBar = (props) => {
  if (props.isAuthenticated) {
    return (
      <ul className="nav navbar-nav">
        <li>
          <NavLink to="/mills" activeClassName="active-link">
            <i className="fa fa-database" aria-hidden="true" /> Mills
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" activeClassName="active-link">
            <i className="fa fa-users" aria-hidden="true" /> Manage Users
          </NavLink>
        </li>
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
};


class SiteHeader extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/');
    this.props.logoutUser();
  }

  render() {
    return (
      <header id="site-header">
        <div className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <NavLink to="/" className="navbar-brand">
                <img src={navbarLogo} alt="Madison's Lumber" className="navbar-logo" /> Home
              </NavLink>
            </div>

            {this.props.authWithTokenStatus === 'COMPLETE' &&
              <NavBar
                handleSubmit={this.handleSubmit}
                isAuthenticated={this.props.isAuthenticated}
              />}
          </div>
        </div>
      </header>
    );
  }
}

SiteHeader.propTypes = {
  authWithTokenStatus: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default withRouter(SiteHeader);