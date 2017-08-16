import React from 'react';
import PropTypes from 'prop-types';

const ManageUserTable = props => {
  return (
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
  );
};

ManageUserTable.proptypes = {
  user: PropTypes.object.isRequired
}

export default ManageUserTable;