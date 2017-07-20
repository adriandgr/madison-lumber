import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import api from '../utils/api';

const UsersTable = (props) => (
  <table className="table table-bordered table-hover table-striped">
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
            <td>
                <Link to={`/users/${user.uuid}`} className="btn btn-sm btn-primary">Manage User</Link>
            </td>
        </tr>
      ))}
    </tbody>
  </table>
);

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
}

const AlertMessages = (props) => {
  let errCount = 0;
  return (
  <div className="alert-messages">
    { props.success.length > 0 &&
      <div className="alert alert-success">
        {this.state.success[0]}
      </div>
    }

    { props.errors.length > 0 &&
      <div className="alert alert-danger">
        {this.state.errors.map(err => {
          errCount++;
          return (
          <span key={`err${errCount}`}>
            {err} <br/>
          </span>
          )
        })}
      </div>
    }
  </div>
)}

AlertMessages.propTypes = {
  success: PropTypes.array.isRequired,
  errors: PropTypes.array.isRequired
}

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      users: []
    }
  }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers() {
    if (!this.props.token) {
      return
    }
    api.getUsers(this.props.token).then(res=> {
      const newState = {
        success: [],
        errors: [],
        users: []
      }

      if (res.success.length) {
        newState.success = res.success;
      }
      if (res.errors.length) {
        newState.errors = res.errors;
      }
      if (res.users.length) {
        newState.users = res.users;
      }

      this.setState(() => newState);
    })
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <div>
          Please log in to view this page.
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

        <div className="jumbotron text-center login-bg">
          <h1 className="heading-brand">Manage Users</h1>
        </div>

        <div className="breadcrumb">
          <a href="/users/create" className="btn btn-lg btn-success"><i className="fa fa-user-plus" aria-hidden="true"></i> Add new user</a>
        </div>

        { this.state.users.length > 0 &&
          <UsersTable
            users={this.state.users}
          />}
      </div>
    )
  }
}

Users.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default Users;