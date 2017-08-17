import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MillsTablePaginate from './_MillsTablePaginate';

const MillsTable = props => {
  return (
    <div>
      <MillsTablePaginate
        page={props.metaData.page}
        pages={props.metaData.pages}
        total={props.metaData.total}
        limit={props.metaData.limit}
        searchQuery={props.search.q}/>
      <table className="table table-bordered table-hover table-striped mills-table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden-xs">Type</th>
            <th className="text-center">Region</th>
            <th className="text-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {props.mills.map(mill => (
              <tr key={mill.slug}>
                <td>
                  <Link to={`/mills/${mill.slug}`} className="mills-table-link">
                      {mill.name}
                  </Link>
                </td>
                <td className="hidden-xs"> {mill.type} </td>
                <td className="text-center"> {mill.region} </td>
                <td className="text-center">
                  { !props.isAdmin &&
                    <Link
                      to={`/mills/${mill.slug}`}
                      className="btn btn-primary">
                        <i className="fa fa-eye" aria-hidden="true"></i> View
                    </Link>
                  }
                  { props.isAdmin &&
                    <div className="dropdown">
                      <button className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Manage &nbsp;
                         <span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenu1">
                        <li>
                          <Link
                            to={`/mills/${mill.slug}`}>
                              <i className="fa fa-eye" aria-hidden="true"></i> View
                          </Link>
                        </li>
                        <li className="divider"></li>
                        <li>
                          <Link
                            to={`/mills/${mill.slug}/edit`}>
                              <i className="fa fa-pencil" aria-hidden="true"></i> Edit
                          </Link>
                        </li>
                        <li className="divider"></li>
                        <li>
                          <Link
                            to='#'
                            name={mill.slug}
                            onClick={(event) => {
                              event.preventDefault();
                              props.handleDelete(event.target.name);
                            }}>
                              <i className="fa fa-trash" aria-hidden="true"></i> Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <MillsTablePaginate
        page={props.metaData.page}
        pages={props.metaData.pages}
        limit={props.metaData.limit}
        total={props.metaData.total}
        searchQuery={props.search.q}
        />
    </div>
  )
};

MillsTable.propTypes = {
  mills: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default MillsTable;