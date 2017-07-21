import React, { Component } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import headerBg from './mills-header.jpg';
import PropTypes from 'prop-types';
import AlertMessages from './AlertMessages';
import Jumbotron from './Jumbotron';


const MillTable = (props) => (
  <table className="table table-bordered table-hover table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Region</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {props.mills.map(mill=> (
          <tr key={mill.slug}>
            <td> {mill.name} </td>
            <td> {mill.type} </td>
            <td> {mill.region} </td>
            <td>
              <Link to={`/mills/${mill.slug}`} className="btn btn-sm btn-primary"><i className="fa fa-eye" aria-hidden="true"></i> View</Link>
              <Link to={`/mills/${mill.slug}/edit`} className="btn btn-sm btn-primary"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</Link>
              <Link to={`/mills/${mill.slug}/delete`} className="btn btn-sm btn-danger"><i className="fa fa-trash" aria-hidden="true"></i> Delete</Link>
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
)

MillTable.propTypes = {
  mills: PropTypes.array.isRequired
}

class Mills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successMsg: [],
      searchMsg: [],
      mills: []
    }
    this.loadMills = this.loadMills.bind(this);
  }

  componentDidMount() {
    this.loadMills()
  }

  componentWillReceiveProps(nextProps) {
    this.loadMills()
  }

  loadMills() {
    api.getMills(this.props.token).then(res=> {
      const newState = {
        successMsg: [],
        searchMsg: [],
        mills: []
      }

      if (res.success) {
        newState.successMsg = res.success;
      }
      if (res.query) {
        newState.searchMsg = res.query;
      }
      if (res.mills) {
        newState.mills = res.mills;
      }

      this.setState(() => newState);
    })
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <div className="container">
          <AlertMessages
            success={[]}
            errors={[
              '401 - Unauthorized',
              'The request lacks valid authentication credentials for the target resource.',
              'Please log in and try again.']}
          />
        </div>
      )
    }

    return (
     <div className="container">
        <Jumbotron
          heading="All Mills"
          imgSrc={headerBg}/>

        { this.state.successMsg &&
          <AlertMessages
            success={this.state.successMsg}
            errors={[]}/> }

        {this.props.isAdmin &&
        <div className="breadcrumb">
          <Link to="/mills/new" className="btn btn-lg btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Add new mill</Link>
        </div>}

        { this.state.searchMsg.length > 0 &&
          <div className="alert alert-info">
            <strong>Search results for:</strong> {this.state.searchMsg}
          </div>}
        { this.props.token && this.state.mills.length > 0 &&
          <MillTable mills={this.state.mills} />}


      </div>
    )
  }
}

Mills.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default Mills