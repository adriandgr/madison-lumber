import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MillsTablePaginate = props => {
  const nextDisabled = props.page === props.pages;
  const prevDisabled = props.page === 1;

  return (
    <div className='row paginate'>
      <div className='col-sm-2 col-sm-offset-0 col-xs-8 col-xs-offset-2'>
        <Link
          to={`?p=${(props.page - 1)}&limit=${props.limit}${props.searchQuery ? '&q=' + props.searchQuery : ''}`}
          className='btn btn-default btn-block'
          onClick={event => prevDisabled && event.preventDefault()}
          disabled={prevDisabled}>
          <i className="fa fa-angle-left" aria-hidden="true"></i>
          &nbsp; Back
        </Link>
      </div>
      <div className='col-sm-5 col-sm-offset-1  col-xs-12 text-center text-middle pagination-info'>
        <span>
          Page <strong>{props.page}</strong> of <strong>{props.pages}</strong> (<strong>{props.total}</strong>  mills in total)
        </span>
      </div>
      <div className='col-sm-2 col-sm-offset-2 col-xs-8 col-xs-offset-2'>
        <Link
          to={`?p=${(props.page + 1)}&limit=${props.limit}${props.searchQuery ? '&q=' + props.searchQuery : ''}`}
          className='btn btn-default btn-block'
          onClick={event => nextDisabled && event.preventDefault()}
          disabled={nextDisabled}
          >
          Next &nbsp;
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
};

export default MillsTablePaginate;