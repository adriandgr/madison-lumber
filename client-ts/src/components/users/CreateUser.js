import React, { Component } from 'react';
import api from '../../utils/api';
import NewUserForm from './_NewUserForm';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../assets/moodyville-yard.jpg'
import AlertMessages from '../shared/AlertMessages';
import UserContext from '../users/UserContext'

class CreateUser extends Component {
  state = {
      success: [],
      errors: [],
      fireRedirect: false
  }

  onSubmit = (user) => {
    api.createUser(this.context.token, user)
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
    if (!this.context.isAuthenticated) {
      return (
        <div className="container">
          <AlertMessages
            success={[]}
            error={[
              '401 - Unauthorized',
              'The request lacks valid authentication credentials for the target resource.',
              'Please log in and try again.']}
          />
        </div>
      )
    }

    if (!this.context.isAdmin) {
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
              error={this.state.errors}
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

CreateUser.contextType = UserContext;

export default CreateUser;