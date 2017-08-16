import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import MillTable from './_MillTable';
import headerBg from '../images/blue-mill.jpg';
import AlertMessages from '../shared/AlertMessages';

const MillBanner = props => (
  <div
    className="jumbotron text-center section-banner"
    style={{backgroundImage: `url(${props.imgSrc})`}}>
    <h1 className="heading-brand">
      {props.mill.name}
    </h1>
    <h2 className="heading-brand">
      {props.mill.type} - {props.mill.region}
    </h2>
  </div>
)

class Mill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      mill: {}
    }
  }

  componentDidMount() {
    this.loadMill();
  }

  componentWillReceiveProps(nextProps) {
    this.loadMill();
  }

  loadMill() {
    api.getMill(this.props.token, this.props.match.url).then(res=> {
      const newState = {
        success: '',
        errors: '',
        mill: {}
      };

      if (res.success) {
        newState.success = res.success;
      }
      if (res.errors) {
        newState.errors = res.errors;
      }
      if (res.mill) {
        newState.mill = res.mill;
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
      { this.state.mill.name
        ? <div className="mill">
            <MillBanner
              imgSrc={headerBg}
              mill={this.state.mill} />

            <MillTable
              mill={this.state.mill} />

          </div>
        : <div className="container">
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
          </div>
      }
      </div>
    )
  }
}

export default Mill