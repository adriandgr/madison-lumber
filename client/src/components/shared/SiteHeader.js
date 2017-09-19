import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import navbarLogo from '../images/madison-logo-small.png';

const LogoutButton = props => (
  <Link to="#" onClick={props.handleSubmit}>
    <i className="fa fa-sign-out" aria-hidden="true"></i> logout
  </Link>
);

LogoutButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const NavBarEmpty = props => (
  <ul className="nav navbar-nav">
  </ul>
);

const NavBarLoggedOut = props => (
  <ul className="nav navbar-nav">
     <li>
       <NavLink to="/login" activeClassName="active-link">
         <i className="fa fa-sign-in" aria-hidden="true"></i> Login
       </NavLink>
     </li>
   </ul>
);

const NavBarLoggedIn = props => (
  <ul className="nav navbar-nav">
    <li>
      <NavLink to="/mills" activeClassName="active-link">
        <i className="fa fa-database" aria-hidden="true"></i> Mills
      </NavLink>
    </li>
    <li>
      <NavLink to="/users" activeClassName="active-link">
        <i className="fa fa-users" aria-hidden="true"></i> Manage Users
      </NavLink>
    </li>
    <li>
      <LogoutButton
        handleSubmit={props.handleSubmit}/>
    </li>
  </ul>
);

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
                  <img
                    src={navbarLogo}
                    alt="Madison's Lumber"
                    className="navbar-logo"
                  />
                  Home
                </NavLink>
              </div>

              { this.props.tokenStatus === 'COMPLETE'
                ?
                  this.props.isAuthenticated ? <NavBarLoggedIn handleSubmit={this.handleSubmit}/> : <NavBarLoggedOut />
                :
                  <NavBarEmpty />
              }

            </div>
          </div>
      </header>
    );
  }
}

SiteHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default withRouter(SiteHeader);