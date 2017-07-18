import React, { Component } from 'react';
import PropTypes from 'prop-types'
import headerBg from './moodyville-yard.jpg'

function SectionBanner(props) {
  return (
    <div className="jumbotron text-center login-bg" style={{backgroundImage: `url(${props.imgSrc})`}}>>
      <h1 className="heading-brand">{props.sectionName}</h1>
    </div>
  )
}

SectionBanner.propTypes = {
  sectionName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
}


class Login extends Component {
  render() {
    return (
      <div className="container">
        <SectionBanner
          sectionName="Login"
          imgSrc={headerBg}
        />

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form action="/api/auth" method="POST">
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input type="text" name="email" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input type="password" name="password" className="form-control" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-success btn-lg">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default Login;
