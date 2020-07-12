import React, { Component } from 'react';
import api from '../../utils/api';
import NewMillForm from './_NewMillForm';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../assets/kiln-dried-lumber.jpg';
import AlertMessages from '../shared/AlertMessages';

import UserContext from '../users/UserContext'
import {Redirect} from "react-router-dom";


class CreateMill extends Component {
  state = {
      success: [],
      errors: [],
      fireRedirect: false
  };

  onSubmit = (mill) => {
    api.createMill(this.context.token, mill)
      .then(res=> {
        if (res.errors) {
          return this.setState(() => ({
            errors: res.errors
          }));
        }
        this.setState(() => ({
          errors: [],
          fireRedirect: true
        }));
      });
  }

  render() {
      if (!this.context.isAuthenticated) {
          return (
              <Redirect to={{ pathname: '/login', state: {
                      from: { pathname: '/mills/new' },
                      error: [
                          '401 - Unauthorized',
                          'Please log in to view the requested resource.'
                      ]} }}/>
          )
      }
    return(
      <div className='container'>

        <Jumbotron
          heading="Create a New Mill"
          imgSrc={headerBg}/>

        { this.state.errors &&
          <AlertMessages
          success={[]}
          errors={this.state.errors}
          />}

        <NewMillForm
          onSubmit={this.onSubmit}
          fireRedirect={this.state.fireRedirect}/>
      </div>
    )
  }
}

CreateMill.contextType = UserContext;

export default CreateMill;