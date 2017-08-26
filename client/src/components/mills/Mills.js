import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import api from '../../utils/api';
import MillsTable from './_MillsTable';
import scroll from '../../utils/scrollTo';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../images/mills-header.jpg';
import AlertMessages from '../shared/AlertMessages';

class Mills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      mills: [],
      searchTerm: [],
      searchQuery: '',
      prevSearchInput: [],
      data: {
        page: 1,
        pages: -1,
        limit: 20,
        total: 0,
      }
    }

    this.baseQuery = `?p=${this.state.data.page}&limit=${this.state.data.limit}`;

    this.loadMills = this.loadMills.bind(this);
    this.reloadMills = this.reloadMills.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    !this.props.history.location.search && this.props.history.push(this.baseQuery);
  }

  componentDidMount() {
    this.loadMills()
  }

  componentWillReceiveProps(nextProps) {
    this.loadMills()
  }

  loadMills() {
    api.getMills(this.props.token, this.props.history.location.search).then(res => {
      const newState = {
        success: [],
        errors: [],
        mills: [],
        searchTerm: [],
        searchQuery: this.state.searchQuery,
        prevSearchInput: this.state.prevSearchInput,
        data: {
          page: res.page ? Number(res.page) : 1,
          pages: res.pages,
          limit: res.limit ? Number(res.limit) : 20,
          total: res.total,
        }
      }

      if (res.success) {
        newState.success = res.success;
      }
      if (res.query) {
        newState.searchTerm = res.query;
      }
      if (res.mills) {
        newState.mills = res.mills;
      }

      this.setState(() => newState);
    })
  }

  reloadMills(event) {
    this.searchInput.value = '';
    this.setState({ searchQuery: '' });
    this.props.history.push(this.baseQuery);
    this.loadMills();
  }

  handleInput(event) {
    this.setState({
      searchQuery: event.target.value,
      prevSearchInput: this.state.prevSearchInput.concat(event.target.value)
    });
    if(event.target.value === '' && this.state.prevSearchInput.slice(-2).shift() !== '') {
      // Reloads all mills if search bar is cleared
      this.props.history.push(`${this.baseQuery}`);
      this.loadMills();
    }
    if(event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.props.history.push(`${this.baseQuery}&q=${event.target.value}`);
      this.loadMills();
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.props.history.push(`${this.baseQuery}&q=${this.searchInput.value}`);
    this.loadMills();
  }

  handleDelete(slug) {
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
      };

      if (res.success) {
        newState.success = res.success;
        this.setState(() => (newState));
      }

      if (res.errors) {
        // if errors are returned, restore the original component state
        newState.mills = snap;
        newState.errors = res.errors;
        this.setState(() => (newState));
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
            <div className="row">
              <div className="col-lg-2 col-lg-offset-0 col-sm-3 col-sm-offset-0 col-md-3 col-md-offset-0 col-xs-10 col-xs-offset-1 mills-table-action">
                <Link to="/mills/new" className="btn btn-lg btn-success btn-block"><i className="fa fa-plus" aria-hidden="true"></i> Add new mill</Link>
              </div>
              <div className="col-lg-2 col-lg-offset-0 col-sm-3 col-sm-offset-0 col-md-3 col-md-offset-0 col-xs-10 col-xs-offset-1 mills-table-action">
                <Link to="/mills/import" className="btn btn-lg btn-success btn-block"><i className="fa fa-upload" aria-hidden="true"></i> Bulk Import</Link>
              </div>
              <div className="col-lg-2 col-lg-offset-0 col-sm-3 col-sm-offset-0 col-md-3 col-md-offset-0 col-xs-10 col-xs-offset-1 mills-table-action">
                <Link to="/mills/not-yet-implemented" className="btn btn-lg btn-success btn-block"><i className="fa fa-download" aria-hidden="true"></i> Export</Link>
              </div>
            </div>
          </div>}

        {this.props.isAuthenticated &&
          <div className="row">
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
          </div>
        }

        { this.state.searchTerm.length > 0 &&
          <div className="alert alert-info">
            Search for <strong> {this.state.searchTerm} </strong> returned <strong> {this.state.data.total} </strong> {this.state.data.total === 1 ? 'result' : 'results'}
          </div>}

        { this.props.token && this.state.mills.length > 0 &&
          <MillsTable
            mills={this.state.mills}
            metaData={this.state.data}
            search={querystring.parse(this.props.history.location.search.slice(1))}
            isAdmin={this.props.isAdmin}
            handleDelete={this.handleDelete} />}
      </div>
    )
  }
}

Mills.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default Mills;