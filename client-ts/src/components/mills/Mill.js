import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../utils/api';
//import millSchema from '../../utils/millSchema';
import MillTable from './_MillTable';
import headerBg from '../assets/blue-mill.jpg';
import LoadingBar from '../LoadingBar';
import AlertMessages from '../shared/AlertMessages';

import UserContext from '../users/UserContext'

class Mill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      mill: null,
      millStatus: 'INIT'
    }

    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.loadMill();
  }

  loadMill() {
      console.log(this.props.match.url)
    api.getMill(this.props.token, this.props.match.url).then(res => {
      const newState = {
        success: '',
        errors: '',
        mill: null,
        millStatus: 'COMPLETE'
      };

      if(res.success) {
        newState.success = res.success;
      }
      if(res.errors) {
        newState.errors = res.errors;
      }
      if(res.mill) {
        newState.mill = res.mill;
      }

      this.setState(() => newState);
    })
  }

  updateMillState(options) {
    let mill = this.state.mill;
    let [[millKeys, val]] = Object.entries(options);
    millKeys = millKeys.split('.');

    if(millKeys.length === 1) {
      const [ key ] = millKeys;
      mill[key] = val;
    } else {
      let temp;
      millKeys.forEach((key, i) => {
        if(i === 0) {
          temp = mill[key];
        } else if(i > 0 && i < (millKeys.length - 1)) {
          temp = temp[key];
        } else {
          mill = temp;
          mill[key] = val;
        }
      });
    }
  }

  handleEdit(options, sectionName) {
    this.updateMillState(options)
    return api.editMill(this.props.token, this.state.mill.uuid, options, sectionName)
              .then(res => {
                if(res.errors) {
                  this.setState({
                    errors: res.errors
                  });
                } else {
                  this.setState({
                    success: res.success
                  });
                }
              });
  }

  render() {
      if (!this.context.isAuthenticated) {
          return (
              <Redirect to={{ pathname: '/login', state: {
                      from: { pathname: '/mills' },
                      error: [
                          '401 - Unauthorized',
                          'Please log in to view the requested resource.'
                      ]} }}/>
          )
      }
    if(this.state.millStatus === 'COMPLETE') {
      if(this.state.mill) {
        return (
          <div className="container">
            <div className="mill">
              <MillBanner
                imgSrc={headerBg}
                mill={this.state.mill} />

              <AlertMessages
                success={this.state.success}
                errors={this.state.errors}
                scroll={true} />

              <MillTable
                isAdmin={this.context.isAdmin}
                mill={this.state.mill}
                handleEdit={this.handleEdit}/>
            </div>
          </div>
        );
      } else {
        return <MillNotFound />;
      }
    } else {
      return <LoadingBar />;
    }
  }
}
Mill.contextType = UserContext;

Mill.propTypes = {
  token: PropTypes.string.isRequired
};

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

MillBanner.propTypes = {
    mill: PropTypes.object.isRequired
};

const MillNotFound = props => (
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
    </div>
);




export default Mill