import React, { Component } from 'react';
import api from '../utils/api';
import NewUserForm from './users/_NewUserForm';
import Jumbotron from './shared/Jumbotron';
import headerBg from './assets/moodyville-yard.jpg'
import AlertMessages from './shared/AlertMessages';

import { UserContext } from './users/UserContext'
import {Redirect} from "react-router-dom";

class Register extends Component {
  state = {
      success: [],
      info: [
              'Early Access by invitation only',
              'An invitation code is required to join at this time.'
              ],
      errors: [],
      fireRedirect: false
    }


  onSubmit = (invitationCode, user) => {
    api.registerUser(invitationCode, user)
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
    if (this.context.isAuthenticated) {
      return <Redirect to={{ pathname: '/'}}/>
    }
    return (
      <div className="container">

        <Jumbotron
          heading="Register"
          imgSrc={headerBg}/>
          <AlertMessages
              success={this.state.success}
              info={this.state.info}
              error={this.state.errors}
              scroll={true} />

          <div class="panel panel-default">
            <div class="panel-body">
              This new web tool is in its final beta testing phase. We welcome
              your feedback as we work to make it easier and more convenient for
              you to search the largest database of Canadian lumber suppliers and remanufacturers.
              Thank you for your interest in Madison's Lumber Directory!
            </div>
          </div>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">


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

Register.contextType = UserContext;

export default Register;