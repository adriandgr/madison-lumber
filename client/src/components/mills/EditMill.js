import React, { Component} from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../images/header-img.jpg'
import AlertMessages from '../shared/AlertMessages';

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
    this.loadMill()
  }

  render() {
    return (
      <div className="container">
        { this.state.mill
          ?
          <Jumbotron
            heading={`Edit ${this.state.mill.name}`}
            imgSrc={headerBg}/>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="form-control" value={this.mill.anem}></input>
            </div>

            <div class="form-group">
              <label htmlFor="description">Description</label>
              <textarea name="description" rows="5" className="form-control">{this.mill.description}</textarea>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-success btn-lg">Update</button>
            </div>
          </form>
          :
          <div className="container">
            <AlertMessages
              success={[]}
              errors={[
                '404 - Not Found',
                'The mill record you requested has been moved or doesn\'t exist anymore.']}
            />
            <Link
              to="/mills"
              className="btn btn-lg btn-default center-block">
                <i className="fa fa-undo" aria-hidden="true"></i> View all mills
            </Link>
            <br />
            <Link
              to="/"
              className="btn btn-lg btn-default center-block">
                <i className="fa fa-home" aria-hidden="true"></i> Take me home
            </Link>
          </div> }
      </div>
    )
  }
}