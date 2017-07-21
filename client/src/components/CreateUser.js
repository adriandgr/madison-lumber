import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import headerBg from './moodyville-yard.jpg'
import PropTypes from 'prop-types';
import AlertMessages from './AlertMessages';
import api from '../utils/api';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pwd: '',
      accountType: 'free'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(event) {
    event.preventDefault()
    const user = {
      name: this.state.firstName,
      surname: this.state.lastName,
      email: this.state.email,
      pwd: this.state.pwd,
      accountType: this.state.type
    }
    this.props.onSubmit(user)

  }

  handleChange(event) {
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  render() {
    return (
      <form action="/users/create" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={this.state.firstName}
            onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={this.state.lastName}
            onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="pwd"
            className="form-control"
            value={this.state.pwd}
            onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="accT">Account Type</label>
          <select
            className="form-control"
            id="accT"
            name="accountType"
            value={this.state.accountType}
            onChange={this.handleChange}>
            <option>free</option>
            <option>paid</option>
            <option>admin</option>
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success btn-lg">Create User</button>
        </div>
      </form>
    )
  }
}

NewUser.proptypes = {
  handleSubmit: PropTypes.func.isRequired
}

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: []
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(user) {
    console.log(user)
    api.createUser(this.props.token, user)
      .then(res=> {
        if (res.errors) {
          this.setState(() => ({
            errors: res.errors
          }))
        } else {
          this.setState(() => ({
            errors: []
          }))
        }
      });
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <div className="container">
          <AlertMessages
            success={[]}
            errors={[
              '401 - Unauthorized',
              'The request lacks valid authentication credentials for the target resource.',
              'Please log in and try again.']}
          />
        </div>
      )
    }

    if (!this.props.isAdmin) {
      return (
        <div className="container">
          <AlertMessages
            success={[]}
            errors={this.state.errors}
          />
        </div>
      )
    }

    return (
      <div className="container">
        <div className="jumbotron text-center login-bg">
          <h1 className="heading-brand">Create a New User</h1>
        </div>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <AlertMessages
              success={this.state.success}
              errors={this.state.errors}/>

            <NewUser
              onSubmit={this.onSubmit}/>
          </div>
        </div>
      </div>
    )
  }
}


export default CreateUser;