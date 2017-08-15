import React, { Component } from 'react';
import Time from'react-time';
import { Link } from 'react-router-dom';
import AlertMessages from './AlertMessages';
import headerBg from './blue-mill.jpg'
import PropTypes from 'prop-types';
import api from '../utils/api';

const MillBanner = (props) => (
  <div
    className="jumbotron text-center section-banner"
    style={{backgroundImage: `url(${props.imgSrc})`}}>
    <h1 className="heading-brand">
      {props.mill.name}
    </h1>
    <h2 className="heading-brand">
      {props.mill.type} - {props.mill.region}
    </h2>
  </div>
)

const MillTable = (props) => (
  <table className="table table-bordered table-hover table-striped">
  <thead>
    <tr>
      <th>Data</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    { props.mill.name &&
      <tr>
          <td>Name</td>
          <td>{props.mill.name}</td>
      </tr>
    }
    { props.mill.type &&
      <tr>
          <td>Type</td>
          <td>{props.mill.type}</td>
      </tr>
    }
    { props.mill.region &&
      <tr>
          <td>Region</td>
          <td>{props.mill.region}</td>
      </tr>
    }
    { props.mill.contact && props.mill.contact.address &&
      <tr>
          <td>Address</td>
          <td>{props.mill.contact.address}</td>
      </tr>
    }
    { props.mill.contact && props.mill.contact.location &&
      <tr>
          <td>Mill Location</td>
          <td>{props.mill.contact.location}</td>
      </tr>
    }
    { props.mill.contact && props.mill.contact.phone &&
      <tr>
          <td>Phone</td>
          <td>
            { props.mill.contact.phone.map((number, i) => (
              <p key={i}>{number}</p>
            )) }
          </td>
      </tr>
    }
    { props.mill.contact && props.mill.contact.fax &&
      <tr>
          <td>Fax</td>
          <td>{props.mill.contact.fax}</td>
      </tr>
    }
    { props.mill.contact && props.mill.contact.email &&
      <tr>
          <td>Email</td>
          <td>{props.mill.contact.email}</td>
      </tr>
    }
    { props.mill.contact && props.mill.contact.website &&
      <tr>
          <td>Website</td>
          <td><Link to={`//${props.mill.contact.website}`}>{props.mill.contact.website}</Link></td>
      </tr>
    }
    { props.mill.contact && props.mill.contact.contactPersons && props.mill.contact.contactPersons[0] !== '' &&
      <tr>
        <td>Contact Persons</td>
        <td>
          { props.mill.contact.contactPersons.map((person, i) => (
              <p key={i}>{person}</p>
            )) }
        </td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.products && props.mill.catalog.products[0] !== '' &&
      <tr>
        <td>Products</td>
        <td>
          { props.mill.catalog.products.map((product, i) => (
              <p key={i}>{product}</p>
            )) }
        </td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.species && props.mill.catalog.species[0] !== '' &&
      <tr>
        <td>Species</td>
        <td>
          { props.mill.catalog.species.map((item, i) => (
              <p key={i}>{item}</p>
            )) }
        </td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.roughSizes.length > 0 && props.mill.catalog.roughSizes[0] !== '' &&
      <tr>
          <td>Rough Sizes</td>
          <td>
            { props.mill.catalog.roughSizes.map((roughSize, i) => (
              <p key={i}>{roughSize}</p>
            )) }
          </td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.surfacedSizes && props.mill.catalog.surfacedSizes[0] !== '' &&
      <tr>
          <td>Surfaced Sizes</td>
          <td>
            { props.mill.catalog.surfacedSizes.map((surfaceSize, i) => (
              <p key={i}>{surfaceSize}</p>
            )) }
          </td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.production &&
      <tr>
          <td>Production</td>
          <td>{props.mill.catalog.production}</td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.panelThickness &&
      <tr>
          <td>Panel Thickness</td>
          <td>{props.mill.catalog.panelThickness}</td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.services[0] !== '' &&
      <tr>
          <td>Services</td>
          <td>
            { props.mill.catalog.services.map((service, i) => (
              <p key={i}>{service}</p>
            )) }
          </td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.kilnCapacity &&
      <tr>
          <td>Kiln Capacity</td>
          <td>{props.mill.catalog.kilnCapacity}</td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.shipping && props.mill.catalog.shipping[0] !== '' &&
      <tr>
          <td>Shipping</td>
          <td>
            { props.mill.catalog.shipping.map((method, i) => (
              <p key={i}>{method}</p>
            )) }
          </td>
      </tr>
    }
    { props.mill.catalog && props.mill.catalog.export.length > 0 && props.mill.catalog.export[0] !== '' &&
      <tr>
          <td>Export</td>
          <td>
          { props.mill.catalog.export.map((location, i) => (
            <p key={i}>{location}</p>
          )) }
          </td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.gradingAgency &&
      <tr>
          <td>Grading Agency</td>
          <td>{props.mill.qualifications.gradingAgency}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.memberOf > 0 &&
      <tr>
          <td>Member Of</td>
          <td>{props.mill.qualifications.memberOf}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.employees &&
      <tr>
          <td>Employees</td>
          <td>{props.mill.qualifications.employees}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.notes &&
      <tr>
          <td>Notes</td>
          <td>{props.mill.qualifications.notes}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.certification &&
      <tr>
          <td>Certification</td>
          <td>{props.mill.qualifications.certification}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.preservatives &&
      <tr>
          <td>Preservatives</td>
          <td>{props.mill.qualifications.preservatives}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.treatingFacilities &&
      <tr>
          <td>Treating Facilities</td>
          <td>{props.mill.qualifications.treatingFacilities}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.distributionYard &&
      <tr>
          <td>Distribution Yard</td>
          <td>{props.mill.qualifications.distributionYard}</td>
      </tr>
    }
    { props.mill.qualifications && props.mill.qualifications.millStatus &&
      <tr>
          <td>Mill Status</td>
          <td>{props.mill.qualifications.millStatus}</td>
      </tr>
    }
    { props.mill.lastUpdated &&
      <tr>
          <td>Last Updated</td>
          <td>
            <Time value={props.mill.lastUpdated} format="DD/MM/YYYY HH:mm" relative />
          </td>
      </tr>
    }
  </tbody>
</table>
)

MillTable.propTypes = {
  mill: PropTypes.object.isRequired
}

class Mill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      mill: {}
    }
  }

  componentDidMount() {
    this.loadMill()
  }

  componentWillReceiveProps(nextProps) {
    this.loadMill()
  }

  loadMill() {
    api.getMill(this.props.token, this.props.match.url).then(res=> {
      const newState = {
        success: '',
        errors: '',
        mill: {}
      }

      if (res.success) {
        newState.success = res.success;
      }
      if (res.errors) {
        newState.errors = res.errors;
      }
      if (res.mill) {
        newState.mill = res.mill;
      }

      this.setState(() => newState);
    })
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <div>
          Please log in to view this page.
        </div>
      )
    }

    return (
      <div className="container">
      { this.state.mill.name
        ? <div className="mill">
            <MillBanner
              imgSrc={headerBg}
              mill={this.state.mill} />

            <MillTable
              mill={this.state.mill} />

          </div>
        : <div className="container">
            <AlertMessages
              success={[]}
              errors={[
                '404 - Not Found',
                'The mill record you requested has been moved or doesn\'t exist anymore.']}
            />
            <Link
              to="/mills"
              className="btn btn-lg btn-default center-block">
                <i className="fa fa-undo" aria-hidden="true"></i> View all mills
            </Link>
            <br />
            <Link
              to="/"
              className="btn btn-lg btn-default center-block">
                <i className="fa fa-home" aria-hidden="true"></i> Take me home
            </Link>
          </div>
      }
      </div>
    )
  }
}

export default Mill