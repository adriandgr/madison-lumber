import React, {useContext} from "react"
import {Link, NavLink} from "react-router-dom"
import logo from "../assets/madison-logo-small.png"
import {UserContext} from "../contexts/userContext"

function NavBar() {
  const {token, logout, userName} = useContext(UserContext)
  
  console.log(userName)
  return(
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} width="32" height="32" alt="Logo: Madison's Lumber Reporter"/>
        </Link>

        <a href="#blank" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/">Home</NavLink>
          <NavLink className="navbar-item" to="/mills">Mills</NavLink>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="#blank"> Admin</a>

            <div className="navbar-dropdown">
              <a className="navbar-item" href="#blank">Manage Users</a>
              <a className="navbar-item" href="#blank">Jobs</a>
              <a className="navbar-item" href="#blank">Contact</a>
              <hr className="navbar-divider"/>
              <a className="navbar-item" href="#blank">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!token 
              ? <>
                <a className="button is-primary" href="#blank">
                <strong>Sign up</strong>
                </a>
                <Link to="/login" className="button is-light">
                  Log in
                </Link>
              </>
              : <>
                
                <div className="button is-primary" >Hello, {userName}</div>
                <button onClick={logout} className="button is-light">
                  Logout
                </button>
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar