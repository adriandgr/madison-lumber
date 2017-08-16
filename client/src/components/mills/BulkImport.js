import React, { Component } from 'react';
import api from '../../utils/api';
import Dropzone from 'dropzone'

class BulkImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csv: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleSumbit(event) {
    event.preventDefault()
    console.log(event.target)
  }

  handleChange(event) {
    const data = new FormData();

    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);
    data.append('description', 'some value user types');

    console.log(event.target, event.target.files[0].name, data.get('file'))
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  render() {
    return (
      <div className='container'>
        <form
          className='dropzone'
          encType="multipart/form-data"
          onSubmit={this.handleSumbit.bind(this)}>
          <label htmlFor="csv">Choose a .csv file to upload</label>
          <input
            className=""
            type='file'
            name="csv"
            accept=".csv"
            value={this.state.csv}
            onChange={this.handleChange} />

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success btn-lg">
                <i className="fa fa-upload" aria-hidden="true"></i> Upload
            </button>

        </div>
        </form>
      </div>
    )
  }
}

export default BulkImport