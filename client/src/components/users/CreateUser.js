import React, { Component } from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import api from '../../utils/api';
import NewUserForm from './_NewUserForm';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../images/moodyville-yard.jpg'
import AlertMessages from '../shared/AlertMessages';

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
              errors={this.state.errors}
              scroll={true} />

            <NewUserForm
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