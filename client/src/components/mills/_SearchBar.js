import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const SearchBar = props => {
  return (
    <div className="search-container col-xs-12">
      <input
        ref={input => this.searchInput = input}
        className="form-control"
        id="search"
        name="search"
        placeholder="Search Mills"
        onKeyUp={this.handleInput}
        onFocus={() => scroll.to('.search-container')}>
      </input>
      <div className="input-group-btn clear-search">
        <span className="btn btn-default btn-search" onClick={this.reloadMills}>
          <i className={`fa fa-close ${this.state.searchQuery ? 'visible' : ''}`}></i>
        </span>
        <button className="btn btn-default btn-search" type="submit" onClick={this.handleClick}>
          <i className="glyphicon glyphicon-search"></i>
        </button>
      </div>
    </div>
  )
};

SearchBar.propTypes = {
  ref: PropTypes.array.isRequired,
  onKeyUp: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired
};

export default SearchBar;