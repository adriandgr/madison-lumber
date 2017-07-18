import React, { Component } from 'react';
import navbarLogo from './madison-logo-small.png';

class SiteHeader extends Component {
  render() {
    return (
      <header id="site-header">
        <div className="navbar navbar-inverse">
          <div className="container-fluid">

              <div className="navbar-header">
                <a href="/" className="navbar-brand">
                  <img
                    src={navbarLogo}
                    alt="Madison's Lumber"
                    className="navbar-logo"
                  />
                  Home
                </a>
              </div>

              <ul className="nav navbar-nav">
                <li>
                  <a href="/login">
                    <i className="fa fa-sign-in" aria-hidden="true"></i> login
                  </a>
                </li>
              </ul>


            </div>
          </div>
      </header>
    );
  }
}

export default SiteHeader;