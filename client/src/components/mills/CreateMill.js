import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Jumbotron from '../shared/Jumbotron';
import headerBg from '../images/kiln-dried-lumber.jpg'
import AlertMessages from '../shared/AlertMessages';

const MillSchema = {
  name: '',
  type: '',
  region: '',
  address: '',
  location: '',
  phone: '',
  fax: '',
  website: '',
  contactPersons: '',
  products: '',
  species: '',
  roughSizes: '',
  surfacedSizes: '',
  production: '',
  panelThickness: '',
  services: '',
  kilnCapacity: '',
  shipping: '',
  export: '',
  gradingAgency: '',
  memberOf: '',
  employees: '',
  notes: '',
  certification: '',
  preservatives: '',
  treatingFacilities: '',
  distributionYard: '',
  millStatus: ''
}

class NewMillForm extends Component {
  constructor(props) {
    super(props);
    // using Object.assign() to create a shallow copy of MillSchema
    this.state = Object.assign({}, MillSchema)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const mill = this.state;
    this.props.onSubmit(mill, () => {
      this.setState(() => (
        Object.assign({}, MillSchema)
      ));
    });
  }

  handleChange(event) {
    const newState = {
      [event.target.name]: event.target.value
    }
    this.setState( () => newState );
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="row"> {/* START MAIN ROW */}
          <div className="col-sm-6"> {/* START LEFT COLUMN */}

            <div className="row"> {/* INTERNAL ROW */}
              <div className="col-sm-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">General</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="name" className="col-sm-3 control-label">Name</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="type" className="col-sm-3 control-label">Type</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="type"
                          value={this.state.type}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="region" className="col-sm-3 control-label">Region</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="region"
                          value={this.state.region}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row"> {/* INTERNAL ROW */}
              <div className="col-sm-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Contact</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="address" className="col-sm-3 control-label">Address</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="location" className="col-sm-3 control-label">Location</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          value={this.state.location}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="col-sm-3 control-label">Phone</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="fax" className="col-sm-3 control-label">Fax</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="fax"
                          value={this.state.fax}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="website" className="col-sm-3 control-label">Website</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="website"
                          value={this.state.website}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactPersons" className="col-sm-3 control-label">Contact Persons</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="contactPersons"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.contactPersons}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div> {/* END LEFT COLUMN */}

          <div className="col-sm-6"> {/* START RIGHT COLUMN */}

            <div className="row"> {/* INTERNAL ROW */}
              <div className="col-sm-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Catalog</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="products" className="col-sm-3 control-label">Products</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="products"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.products}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="species" className="col-sm-3 control-label">Species</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="species"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.species}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="roughSizes" className="col-sm-3 control-label">Rough Sizes</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="roughSizes"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.roughSizes}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="surfacedSizes" className="col-sm-3 control-label">Surfaced Sizes</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="surfacedSizes"
                          value={this.state.surfacedSizes}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="production" className="col-sm-3 control-label">Production</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="production"
                          value={this.state.production}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="panelThickness" className="col-sm-3 control-label">Panel Thickness</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="panelThickness"
                          value={this.state.panelThickness}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="services" className="col-sm-3 control-label">Services</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="services"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.services}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="kilnCapacity" className="col-sm-3 control-label">Kiln Capacity</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="kilnCapacity"
                          value={this.state.kilnCapacity}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipping" className="col-sm-3 control-label">Shipping</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="shipping"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.shipping}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="export" className="col-sm-3 control-label">Export</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="export"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.export}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row"> {/* INTERNAL ROW */}
              <div className="col-sm-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Qualifications</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form-group">
                      <label htmlFor="gradingAgency" className="col-sm-3 control-label">Grading Agency</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="gradingAgency"
                          value={this.state.gradingAgency}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="memberOf" className="col-sm-3 control-label">Member Of</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="memberOf"
                          placeholder="Array field: item1, item2, item3"
                          value={this.state.memberOf}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="employees" className="col-sm-3 control-label">Employees</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="employees"
                          placeholder="Must be a number"
                          value={this.state.employees}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="notes" className="col-sm-3 control-label">Notes</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="notes"
                          value={this.state.notes}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="certification" className="col-sm-3 control-label">Certification</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="certification"
                          value={this.state.certification}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="preservatives" className="col-sm-3 control-label">Preservatives</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="preservatives"
                          value={this.state.preservatives}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="treatingFacilities" className="col-sm-3 control-label">Treating Facilities</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="treatingFacilities"
                          value={this.state.treatingFacilities}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="distributionYard" className="col-sm-3 control-label">Distribution Yard</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="distributionYard"
                          value={this.state.distributionYard}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="millStatus" className="col-sm-3 control-label">Mill Status</label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          name="millStatus"
                          value={this.state.millStatus}
                          onChange={this.handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* END RIGHT COLUMN */}
        </div> {/* END MAIN ROW */}

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-success btn-lg center-block">Create Mill</button>
          </div>
        </div>
      </form>
    )
  }
}

NewMillForm.proptypes = {
  onSubmit: PropTypes.func.isRequired
}

class CreateMill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: []
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(mill, clearForm) {
    console.log('its me!', mill)
    api.createMill(this.props.token, mill)
      .then(res=> {
        if (res.errors) {
          return this.setState(() => ({
            errors: res.errors
          }));
        }
        this.setState(() => ({
          errors: []
        }))
        clearForm();
      });
  }

  render() {
    return(
      <div className='container'>

        <Jumbotron
          heading="Create a New Mill"
          imgSrc={headerBg}/>

        { this.state.errors &&
          <AlertMessages
          success={[]}
          errors={this.state.errors}
          />}

        <NewMillForm
          onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default CreateMill;