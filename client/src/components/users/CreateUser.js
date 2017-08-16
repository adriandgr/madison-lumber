import React, { Component } from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../images/moodyville-yard.jpg'
import AlertMessages from '../shared/AlertMessages';

class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pwd: '',
      accountType: 'free'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault()
    const user = {
      name: this.state.firstName,
      surname: this.state.lastName,
      email: this.state.email,
      pwd: this.state.pwd,
      accountType: this.state.accountType
    }
    this.props.onSubmit(user)
    this.setState({ fireRedirect: true })
  }

  handleChange(event) {
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  render() {
    const { fireRedirect } = this.props

    return (
      <div>
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
            <label htmlFor="">Account Type</label>
            <select
              className="form-control"
              name="accountType"
              value={this.state.accountType}
              onChange={this.handleChange}>
              <option value='free'>free</option>
              <option value='paid'>paid</option>
              <option value='admin'>admin</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-success btn-lg">Create User</button>
          </div>
        </form>
        { fireRedirect && (
          <Redirect to={'/users'} success={'asdfasdf'}/>
        ) }
      </div>
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
      errors: [],
      fireRedirect: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(user) {
    console.log(user);
    api.createUser(this.props.token, user)
      .then(res => {
        if (res.errors) {
          this.setState(() => ({
            errors: res.errors
          }))
        } else {
          this.setState(() => ({
            errors: [],
            fireRedirect: true
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

        <Jumbotron
          heading="Create a New User"
          imgSrc={headerBg}/>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <AlertMessages
              success={this.state.success}
              errors={this.state.errors}/>

            <NewUser
              onSubmit={this.onSubmit}
              fireRedirect={this.state.fireRedirect}
              />
          </div>
        </div>
      </div>
    )
  }
}


export default CreateUser;