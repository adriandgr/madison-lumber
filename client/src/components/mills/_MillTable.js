import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MillTablePaginate from './_MillTablePaginate';

const MillTable = props => {
  return (
    <div>
      <MillTablePaginate
        page={props.metaData.page}
        pages={props.metaData.pages}
        limit={props.metaData.limit}
        searchQuery={props.search.q}/>
      <table className="table table-bordered table-hover table-striped">
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
                  <Link to={`/mills/${mill.slug}`} className="mill-table-link">
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
                      <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                        <li>
                          <Link
                            to={`/mills/${mill.slug}`}>
                              <i className="fa fa-eye" aria-hidden="true"></i> View
                          </Link>
                        </li>
                        <li className="divider"></li>
                        <li className="divider"></li> {/* For some reason this doesn't work w/ one divider ??? */}
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
      <MillTablePaginate
        page={props.metaData.page}
        pages={props.metaData.pages}
        limit={props.metaData.limit}
        searchQuery={props.search.q}
        />
    </div>
  )
};

MillTable.propTypes = {
  mills: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default MillTable;