import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import navbarLogo from './madison-logo-small.png';

const LogoutButton = withRouter(({ history }, props) => (
  <button onClick={() => {
      //this.props.signout(() => history.push('/'))
      console.log(this)
    }}>
    <i className="fa fa-sign-out" aria-hidden="true"></i> logout
  </button>
))

function handleLogout(props) {
  return (
    <div>
    </div>
  )
}

LogoutButton.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

class SiteHeader extends Component {
  render() {
    console.log('PROP', this.props.user)
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


                {this.props.user
                  ? <ul className="nav navbar-nav">
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
                        <LogoutButton onSubmit={this.props.logoutUser}/>
                      </li>
                    </ul>
                  : <ul className="nav navbar-nav">
                      <li>
                        <NavLink to="/login" activeClassName="active-link">
                          <i className="fa fa-sign-in" aria-hidden="true"></i> login
                        </NavLink>
                      </li>
                    </ul>}



            </div>
          </div>
      </header>
    );
  }
}

SiteHeader.propTypes = {
  user: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired
}

export default SiteHeader;