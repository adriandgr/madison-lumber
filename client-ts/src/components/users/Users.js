import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import api from '../../utils/api';
import headerBg from '../assets/moodyville-yard.jpg'
import AlertMessages from '../shared/AlertMessages';

import UserContext from '../users/UserContext'

const UsersBanner = props => (
  <div
    className="jumbotron text-center section-banner"
    style={{backgroundImage: `url(${props.imgSrc})`}}>
    <h1 className="heading-brand">
      {props.heading}
    </h1>
  </div>
)

const UsersTable = props => (
  <table className="table table-bordered table-hover table-striped user-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Account Type</th>
        <th>Expiry</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.users.map(user => (
        <tr key={user.uuid}>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.accountType}</td>
            <td></td>
            <td className="manage-user">
              <Link to={`/users/${user.uuid}`} className="btn btn-sm btn-default">Manage User</Link>
            </td>
        </tr>
      ))}
    </tbody>
  </table>
);

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
}



class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      loaded: true,
      users: []
    }
  }

  componentDidMount() {
    this.loadUsers();
  }
  componentWillReceiveProps(nextProps) {
    this.loadUsers();
  }
  componentWillUpdate() {
    this.state.loaded && this.loadUsers();
  }

  loadUsers() {
    if (!this.context.token) {
      return
    }
    api.getUsers(this.context.token).then(res=> {
      const newState = {
        success: [],
        errors: [],
        users: []
      }

      if (res.success) {
        newState.success = res.success;
        newState.loaded = false;
      }
      if (res.errors) {
        newState.errors = res.errors;
      }
      if (res.users) {
        newState.users = res.users;
      }

      this.setState(() => newState );
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
        { (this.state.success || this.state.errors) &&
          <AlertMessages
            success={this.state.success}
            errors={this.state.errors}
          />}

        <UsersBanner
          heading='Manage Users'
          imgSrc={headerBg} />

        <div className="breadcrumb">
          <Link to="/users/new" className="btn btn-lg btn-success action-button">
            <i className="fa fa-user-plus" aria-hidden="true"></i> Add new user
          </Link>
        </div>

        { this.state.users.length > 0 &&
          <UsersTable
            users={this.state.users}
          />}
      </div>
    )
  }
}

Users.contextType = UserContext;

Users.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default Users;