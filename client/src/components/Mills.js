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
              { props.isAdmin &&
                  <Link
                    to={`/mills/${mill.slug}/edit`}
                    className="btn btn-sm btn-primary">
                      <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                  </Link>}
              { props.isAdmin &&
                  <Link
                    to='#'
                    name={mill.slug}
                    className="btn btn-sm btn-danger"
                    onClick={(event) => {
                      event.preventDefault();
                      props.handleDelete(event.target.name);
                    }}>
                      <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </Link>}
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
)

MillTable.propTypes = {
  mills: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired
}

class Mills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      searchMsg: [],
      mills: []
    }
    this.loadMills = this.loadMills.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
        success: [],
        errors: [],
        searchMsg: [],
        mills: []
      }

      if (res.success) {
        newState.success = res.success;
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

  handleDelete(slug){
    const { mills } = this.state;
    const snap = Object.assign([], mills)
    const index = mills.indexOf(mills.find(mill => mill.slug === slug))
    mills.splice(index, 1);

    // optimistically remove the target mill from the component state
    this.setState(() => (mills));

    api.deleteMill(this.props.token, slug).then(res => {
      const newState = {
        success: [],
        errors: []
      }

      if (res.success) {
        newState.success = res.success
        this.setState(() => (newState))
      }

      if (res.errors) {
        // if errors are returned, restore the original component state
        newState.mills = snap;
        newState.errors = res.errors;
        this.setState(() => (newState))
      }
    });
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

        { (this.state.success || this.state.errors) &&
          <AlertMessages
            success={this.state.success}
            errors={this.state.errors}/> }

        {this.props.isAdmin &&
        <div className="breadcrumb">
          <Link to="/mills/new" className="btn btn-lg btn-success action-button"><i className="fa fa-plus" aria-hidden="true"></i> Add new mill</Link>
          <Link to="/mills/import" className="btn btn-lg btn-success action-button"><i className="fa fa-upload" aria-hidden="true"></i> Bulk Import</Link>
          <Link to="/mills/not-yet-implemented" className="btn btn-lg btn-success action-button"><i className="fa fa-download" aria-hidden="true"></i> Export</Link>
        </div>}

        { this.state.searchMsg.length > 0 &&
          <div className="alert alert-info">
            <strong>Search results for:</strong> {this.state.searchMsg}
          </div>}
        { this.props.token && this.state.mills.length > 0 &&
          <MillTable
            mills={this.state.mills}
            isAdmin={this.props.isAdmin}
            handleDelete={this.handleDelete} />}


      </div>
    )
  }
}

Mills.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default Mills