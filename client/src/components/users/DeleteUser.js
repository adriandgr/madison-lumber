import React, { Component} from 'react';
import { Redirect } from 'react-router'

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.email);
  }

  handleChange(event) {
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  render() {
    const { fireRedirect } = this.props

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
                    autoComplete="off"
                    value={this.state.email}
                    onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-danger btn-lg">Delete User</button>
                </div>
              </form>
              { fireRedirect && (
                <Redirect to={'/users'}/>
              ) }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DeleteUser;
