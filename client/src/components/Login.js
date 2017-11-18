import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { saveState } from '../utils/localStorage';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Jumbotron from './shared/Jumbotron';
import headerBg from './images/moodyville-yard.jpg';
import AlertMessages from './shared/AlertMessages';

function SectionBanner(props) {
  return (
    <div
      className="jumbotron text-center section-banner"
      style={{backgroundImage: `url(${props.imgSrc})`}}>
      <h1 className="heading-brand">
        {props.sectionName}
      </h1>
    </div>
  );
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
      redirectTo: '/',
      email: '',
      pwd: '',
      errors: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.errors) {
      this.setState(() => ({errors: this.props.location.state.errors}));
    }
    if (this.props.location.state && this.props.location.state.from) {
      this.setState(() => ({redirectTo: this.props.location.state.from.pathname}));
    }
  }

  handleChange(event) {
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  handleSubmit(event) {
    const redirectTo = this.state.redirectTo;
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
        if (this.state.redirectTo === '/') {
          this.props.onSubmit(
            res.token,
            res.user,
            res.isAdmin,
            redirectTo
          )
        } else {
          const token = res.token
          saveState({ token });
          this.setState(() => ({redirectToReferrer: true}));
        }


      }

    })
  }

  render() {
    const { redirectToReferrer } = this.state;

    console.log(this.state.redirectTo);
    if (this.props.isAuthenticated === true) {
      return (
        <Redirect to="/"/>
      )
    }

    if (redirectToReferrer) {
      return (
        <Redirect to={this.state.redirectTo}/>
      )
    }

    return (
      <div className="container">
        <Jumbotron
          heading="Login"
          imgSrc={headerBg}/>

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
                <button type="submit" className="btn btn-success btn-lg btn-block"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</button>
                <Link to="/register" className="btn btn-link btn-block">
                  <i className="fa fa-user-o" aria-hidden="true"></i> Register
                </Link>

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
