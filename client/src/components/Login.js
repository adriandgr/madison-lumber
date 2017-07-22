import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AlertMessages from './AlertMessages';
import api from '../utils/api';
import PropTypes from 'prop-types'
import headerBg from './moodyville-yard.jpg'

function SectionBanner(props) {
  return (
    <div
      className="jumbotron text-center section-banner"
      style={{backgroundImage: `url(${props.imgSrc})`}}>
      <h1 className="heading-brand">
        {props.sectionName}
      </h1>
    </div>
  )
}

SectionBanner.propTypes = {
  sectionName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: '',
      pwd: '',
      errors: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  handleSubmit(event) {
    event.preventDefault();
    api.authUser(
      this.state.email,
      this.state.pwd
    ).then(res => {
      if (res.errors) {
        this.setState(() => ({errors: res.errors}));
      } else {
        this.setState(() => ({errors: []}))
      }

      if (res.token) {
        this.props.onSubmit(
          res.token,
          res.user,
          res.isAdmin
        )
        this.setState({ redirectToReferrer: true })
      }

    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className="container">
        <SectionBanner
          sectionName="Login"
          imgSrc={headerBg}
        />

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            {this.state.errors &&
              <AlertMessages
                success={[]}
                errors={this.state.errors} />}
            <form action="/api/auth" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="pwd"
                  className="form-control"
                  value={this.state.pwd}
                  onChange={this.handleChange}
                />
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

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Login;
