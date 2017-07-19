import React, { Component } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      successMsg: '',
      searchMsg: '',
      mills: []
    }
    this.loadMills = this.loadMills.bind(this);
  }

  componentDidMount() {
    this.loadMills()
  }

  loadMills() {
    if (!this.props.token) {
      return
    }
    api.getMills(this.props.token).then(res=> {
    //   if (res.success) {
    //     this.setState(()=>({
    //       successMsg: res.success
    //     }))
    //   } else {
    //     this.setState(()=>({
    //       successMsg: ''
    //     }))
    //   }
    //   if (res.query) {
    //     this.setState(()=>({
    //       searchMsg: res.query
    //     }))
    //   } else {
    //     this.setState(()=>({
    //       searchMsg: ''
    //     }))
    //   }
      if (res.mills) {
        this.setState(()=>({
          mills: res.mills
        }))
      } else {
        this.setState(()=>({
          mills: []
        }))
      }
    })
  }

  render() {
    // if (!this.props.isAuthenticated) {
    //   return (
    //     <div>
    //       Please log in to view this page.
    //     </div>
    //   )
    // }

    return (
     <div className="container">
        { this.state.successMsg &&
          <div className="alert alert-success">
            {this.state.successMsg}
          </div>}

        <div className="jumbotron text-center mills-bg">
          <h1 className="heading-brand">All Mills</h1>
        </div>

        {this.props.isAdmin &&
        <div className="breadcrumb">
          <Link to="/mills/create" className="btn btn-lg btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Add new mill</Link>
        </div>}

        {this.state.searchMsg &&
          <div className="alert alert-info">
            <strong>Search results for:</strong> {this.state.searchMsg}
          </div>}
        {this.state.mills &&
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