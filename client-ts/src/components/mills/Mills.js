import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import api from '../../utils/api';
import MillsTable from './_MillsTable';
import scroll from '../../utils/scrollTo';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../assets/mills-header.jpg';
import AlertMessages from '../shared/AlertMessages';
import SearchMills from './_SearchMills';

import { UserContext } from '../users/UserContext'

class Mills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      mills: [],
      searchTerm: [],
      searchRegion: [],
      searchType: [],
      searchProduct: [],
      searchSpecies: [],
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
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    !this.props.history.location.search && this.props.history.push(this.baseQuery);
  }

  componentDidMount() {
    this.loadMills();
  }

  componentWillReceiveProps(nextProps) {
    this.loadMills();
  }

  loadMills() {
    if (this.context.isAuthenticated) {
      api.getMills(this.context.token, this.props.history.location.search).then(res => {
        const newState = {
          success: [],
          errors: [],
          mills: [],
          searchTerm: [],
          searchQuery: this.state.searchQuery,
          searchRegion: this.state.searchRegion,
          searchType: this.state.searchType,
          searchSpecies: this.state.searchSpecies,
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
      }).catch(err =>{
        if (err.response && err.response.data ){
          if (err.response.data.errors){
            this.setState(() => ({ errors: err.response.data.errors }));
          } else {
            this.setState(() => ({ errors: [] }));
          }
        }
      });
    }
  }

  reloadMills(event) {
    //this.searchInput.value = '';
    this.setState({ searchQuery: '' });
    this.props.history.push(this.baseQuery);
    this.loadMills();
  }

  onChange(event) {
    this.setState({searchQuery: event.target.value});
  }

  handleInput(event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery: searchQuery,
      // prevSearchInput: this.state.prevSearchInput.concat(searchQuery)
    });
    if(searchQuery === '') { //&& this.state.prevSearchInput.slice(-2).shift() !== ''
      // Reloads all mills if search bar is cleared
      this.props.history.push(`${this.baseQuery}`);
      this.loadMills();
    }
    if(event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      this.props.history.push(`${this.baseQuery}&q=${searchQuery}&r=${this.state.searchRegion}`);
      this.loadMills();
    }
  }

  handleTypeChange(event) {
    const inputType = event.target.value;
    if (event.target.checked) {
      this.setState({
        searchType: this.state.searchType.concat(inputType)
      }, () => {
        console.log("Type set to: " + this.state.searchType);
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      } );
    } else {
      this.setState({
        searchType: this.state.searchType.filter((type) => type !== inputType)
      }, () => {
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      });
    } 
  }

  handleRegionChange(event) {
    const inputRegion = event.target.value;
    if (event.target.checked) {
      this.setState({
        searchRegion: this.state.searchRegion.concat(inputRegion)
      }, () => {
        console.log("Region set to: " + this.state.searchRegion);
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      } );
    } else {
      this.setState({
        searchRegion: this.state.searchRegion.filter((region) => region !== inputRegion)
      }, () => {
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      });
    }   
  }

  handleProductChange(event) {
    const inputProduct = event.target.value;
    if (event.target.checked) {
      this.setState({
        searchProduct: this.state.searchProduct.concat(inputProduct)
      }, () => {
        console.log("Product set to: " + this.state.searchProduct);
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      } );
    } else {
      this.setState({
        searchProduct: this.state.searchProduct.filter((product) => product !== inputProduct)
      }, () => {
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      });
    }   
  }

  handleSpeciesChange(event) {
    const inputSpecies = event.target.value;
    if (event.target.checked) {
      this.setState({
        searchSpecies: this.state.searchSpecies.concat(inputSpecies)
      }, () => {
        console.log("Species set to: " + this.state.searchSpecies);
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      } );
    } else {
      this.setState({
        searchSpecies: this.state.searchSpecies.filter((species) => species !== inputSpecies)
      }, () => {
        this.props.history.push(`${this.baseQuery}&q=${this.state.searchQuery}&r=${this.state.searchRegion}&t=${this.state.searchType}&pr=${this.state.searchProduct}&sp=${this.state.searchSpecies}`);
      });
    }   
  }

  handleClick(event) {
    const searchQuery = event.target.value.trim();
    event.preventDefault();
    this.props.history.push(`${this.baseQuery}&q=${searchQuery}`);
    this.loadMills();
  }

  handleDelete(slug) {
    const { mills } = this.state;
    const snap = Object.assign([], mills)
    const index = mills.indexOf(mills.find(mill => mill.slug === slug))
    mills.splice(index, 1);

    // optimistically remove the target mill from the component state
    this.setState(() => (mills));

    api.deleteMill(this.context.token, slug).then(res => {
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
    if (!this.context.isAuthenticated) {
      return (
        <Redirect to={{ pathname: '/login', state: {
          from: { pathname: '/mills' },
          error: [
            '401 - Unauthorized',
            'Please log in to view the requested resource.'
          ]} }}/>
      )
    }

    return (
     <div className="container">
        <Jumbotron
          heading="Mills"
          imgSrc={headerBg}/>

        { (this.state.success || this.state.errors) &&
          <AlertMessages
            success={this.state.success}
            error={this.state.errors}
            scroll={true}/> 
        }


        <div className="row">
          {this.context.isAuthenticated &&
              <SearchMills
                ref={input => this.searchInput = input}
                onKeyUp={this.handleInput}
                onChange={this.onChange}
                onRegionChange={this.handleRegionChange}
                onTypeChange={this.handleTypeChange}
                onProductChange={this.handleProductChange}
                onSpeciesChange={this.handleSpeciesChange}
                onFocus={() => scroll.to('.search-container')}
                searchQuery={this.state.searchQuery}
                reloadMills={this.reloadMills}
                handleClick={this.handleClick}/>
          }

          {/* { this.state.searchTerm.length > 0 &&
            <div className="alert alert-info">
              Search for <strong> {this.state.searchTerm} </strong> returned <strong> {this.state.data.total} </strong> {this.state.data.total === 1 ? 'result' : 'results'}
            </div>
          } */}

          { this.context.token && this.state.mills.length > 0 &&
            <div className="col">
              <MillsTable
                mills={this.state.mills}
                metaData={this.state.data}
                searchQuery={this.state.searchQuery} //querystring.parse(this.props.history.location.search.slice(1))
                searchRegion={this.state.searchRegion}
                searchType={this.state.searchType}
                searchProduct={this.state.searchProduct}
                searchSpecies={this.state.searchSpecies}
                isAdmin={this.context.isAdmin}
                handleDelete={this.handleDelete} />
            </div>
          }
        </div>
      </div>
    )
  }
}

Mills.contextType = UserContext;

Mills.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Mills;