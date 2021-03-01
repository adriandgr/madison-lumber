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
        searchQuery={props.searchQuery}
        searchRegion={props.searchRegion}
        searchType={props.searchType}
        searchProduct={props.searchProduct}
        searchSpecies={props.searchSpecies}/>
      <table className="table table-bordered table-hover table-striped mills-table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hidden-xs">Type</th>
            <th className="text-center">Region</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.mills.map(mill => (
              <tr key={mill.uuid}>
                <td>
                  <Link to={`/mills/${mill._id}`} className="mills-table-link">
                      {mill.name}
                  </Link>
                </td>
                <td className="hidden-xs"> {mill.type} </td>
                <td className="text-center"> {mill.region} </td>
                <td className="text-center"> {mill.qualifications.millStatus} </td>
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
        searchQuery={props.searchQuery}
        searchRegion={props.searchRegion}
        searchType={props.searchType}
        searchProduct={props.searchProduct}
        searchSpecies={props.searchSpecies}
        />
    </div>
  )
};

MillsTable.propTypes = {
  mills: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchRegion: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  searchProduct: PropTypes.string.isRequired,
  searchSpecies: PropTypes.string.isRequired
};

export default MillsTable;