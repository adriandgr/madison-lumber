import React from 'react';
// import { Link } from 'react-router-dom';
// import scroll from '../../utils/scrollTo';
import PropTypes from 'prop-types';


const SearchMills = props => {
  return (
    <div className="search-container col-xs-12">
      <input
        ref={props.ref}
        className="form-control"
        id="search"
        name="search"
        placeholder="Search Mills"
        onKeyUp={props.onKeyUp}
        onFocus={props.onFocus}>
      </input>
      <div className="input-group-btn clear-search">
        <span className="btn btn-default btn-search" onClick={props.reloadMills}>
          <i className={`fa fa-close ${props.searchQuery ? 'visible' : ''}`}></i>
        </span>
        <button className="btn btn-default btn-search" type="submit" onClick={props.handleClick}>
          <i className="glyphicon glyphicon-search"></i>
        </button>
      </div>
      advanced
    </div>
  )
};

SearchMills.propTypes = {
  ref: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  searchQuery: PropTypes.func.isRequired,
  reloadMills: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};


export default SearchMills;