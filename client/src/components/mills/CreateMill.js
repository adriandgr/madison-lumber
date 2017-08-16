import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import NewMillForm from './_NewMillForm';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../images/kiln-dried-lumber.jpg';
import AlertMessages from '../shared/AlertMessages';

class CreateMill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      fireRedirect: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(mill) {
    api.createMill(this.props.token, mill)
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

export default CreateMill;