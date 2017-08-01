import React, { Component} from 'react';
import headerBg from './kiln-dried-lumber.jpg'
import api from '../utils/api';
import PropTypes from 'prop-types';
import AlertMessages from './AlertMessages';
import Jumbotron from './Jumbotron';

const UserTable = (props) => (
<div className="panel panel-default">
  {/* Default panel contents */}
  <div className="panel-heading"><strong>User Details</strong></div>


  {/* List group */}
  <ul className="list-group">
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-3"><strong>First Name</strong></div>
        <div className="col-sm-9"> {props.user.firstName}</div>
      </div>
    </li>
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-3"><strong>Last Name</strong></div>
        <div className="col-sm-9"> {props.user.lastName} </div>
      </div>
    </li>
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-3"><strong>Email</strong></div>
        <div className="col-sm-9"> {props.user.email}</div>
      </div>
    </li>
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-3"><strong>Account Type</strong></div>
        <div className="col-sm-9"> {props.user.accountType} </div>
      </div>
    </li>
    <li className="list-group-item">
      <div className="row">
        <div className="col-sm-3"><strong>Created</strong></div>
        <div className="col-sm-9"> {props.user.created} </div>
      </div>
    </li>
  </ul>
</div>
)

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.email)
  }

  handleChange(event) {
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  render() {
    return(
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">Danger Zone</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-offset-1 col-md-5 ">
              <h4 className="text-danger">Delete User Account</h4>
              Once you delete a user, there is no going back. <br />
              <em>Please be certain.</em><br /><br />
            </div>

            <div className="col-md-5">
              <form action={`${this.props.matchUrl}/delete`} onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="" className="text-danger">Confirm action by typing user's email.</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-danger btn-lg">Delete User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UserTable.proptypes = {
  user: PropTypes.object.isRequired
}

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      user: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.loadUser()
  }

  componentWillUpdate() {
    this.loadUser()
  }

  onSubmit(email) {
    api.deleteUser(this.props.token, email, this.props.match.url).then(res=>{
      console.log(res)
    })

  }

  loadUser() {
    if (!this.props.token) {
      return
    }
    api.getUser(this.props.token, this.props.match.url).then(res=> {
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
        newState.user = res.user;
      }

      this.setState(() => newState);
    })
  }


  render() {
    return(
      <div className='container'>

        <Jumbotron
          heading="All Mills"
          imgSrc={headerBg}/>

        { (this.state.success || this.state.errors) &&
          <AlertMessages
            success={this.state.success}
            errors={this.state.errors}/> }

        { this.state.user &&
          <UserTable
            user={this.state.user}
            />}
        <DeleteUser
          onSubmit={this.onSubmit}
          matchUrl={this.props.match.url}
          />
      </div>
    )
  }
}

export default ManageUser;






<a href="/users" class="btn btn-lg btn-success"><i class="fa fa-arrow-left" aria-hidden="true"></i> Return to all users</a>



