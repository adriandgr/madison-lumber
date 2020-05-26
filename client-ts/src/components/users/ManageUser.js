import React, { Component} from 'react';
import api from '../../utils/api';
import DeleteUser from './DeleteUser';
import ManageUserTable from './_ManageUserTable';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../assets/header-img.jpg'
import AlertMessages from '../shared/AlertMessages';
import { UserContext } from '../users/UserContext'
import {Redirect} from "react-router-dom";


class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      user: {},
      fireRedirect: false,
      loaded: true
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.loadUser()
  }

  componentWillUpdate() {
    this.state.loaded && this.loadUser()
  }

  onSubmit(email) {
    api.deleteUser(this.context.token, email, this.props.match.url)
      .then(res => {
        if(res.errors) {
          this.setState(() => ({
            errors: res.errors
          }));
        } else{
          this.setState(() => ({
            errors: [],
            fireRedirect: true
          }));
        }
      });
  }

  loadUser() {
    if (!this.context.token) {
      return
    }
    api.getUser(this.context.token, this.props.match.url).then(res => {
      const newState = {
        success: '',
        errors: '',
        user: {}
      }

      if (res.success) {
        newState.success = res.success;
      }
      if (res.errors) {
        newState.errors = res.errors;
      }
      if (res.user) {
        newState.loaded = false
        newState.user = res.user;
      }
      this.setState(() => newState);
    })
  }


  render() {
    if (!this.context.isAuthenticated) {
      return (
          <Redirect to={{ pathname: '/login', state: {
              from: { pathname: '/users' },
              error: [
                '401 - Unauthorized',
                'Please log in to view the requested resource.'
              ]} }}/>
      )
    }
    return(
      <div className='container'>

        <Jumbotron
          heading="Manage User"
          imgSrc={headerBg}/>

        { (this.state.success || this.state.errors) &&
          <AlertMessages
            success={this.state.success}
            errors={this.state.errors}/> }

        { this.state.user &&
          <ManageUserTable
            user={this.state.user}
            /> }

        <DeleteUser
          onSubmit={this.onSubmit}
          matchUrl={this.props.match.url}
          fireRedirect={this.state.fireRedirect}
          />
      </div>
    )
  }
}

ManageUser.contextType = UserContext;

export default ManageUser;
