import React from 'react';
// import scroll from '../../utils/scrollTo';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Collapsible from './Collapsible';


type Props = {
    ref: any;
    onChange: any;
    onKeyUp: any;
    onFocus: any;
    onRegionChange: any;
    onTypeChange: any;
    onProductChange: any;
    onSpeciesChange: any;
    searchQuery: any;
    reloadMills: any;
    handleClick: any;
}

const SearchMills = (props: Props) => {

  const collapsibleTitle = (title: string) => (
    <div>
      <i className="fa fa-caret-down" aria-hidden="true" />&nbsp;
      <span>{title}</span>
    </div>
  );

  const collapsibleTitleOpen = (title: string) => (
    <div>
      <i className="fa fa-caret-up" aria-hidden="true" />&nbsp;
      <span>{title}</span>
    </div>
  );

  return (
    <div className="col-2">
      <h4 className="text-muted">Search:</h4>
        <Form.Group controlId="searchTerm">
          <Form.Control
            ref={props.ref}
            name="search"
            value={props.searchQuery}
            placeholder="name or grading"
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onFocus={props.onFocus}>
          </Form.Control>
        </Form.Group>
        <h6 className="text-muted">Filter:</h6>
        <Collapsible trigger={collapsibleTitle("Region")} triggerWhenOpen={collapsibleTitleOpen("Region")} open>
          <Form.Group controlId="filterRegion">
            <Form.Check type="checkbox" label="Alberta" onChange={props.onRegionChange} value="AB"/>
            <Form.Check type="checkbox" label="British Columbia" onChange={props.onRegionChange} value="BC"/>
            <Form.Check type="checkbox" label="Manitoba" onChange={props.onRegionChange} value="MB"/>
            <Form.Check type="checkbox" label="New Brunswick" onChange={props.onRegionChange} value="NB"/>
            <Form.Check type="checkbox" label="Newfoundland" onChange={props.onRegionChange} value="NL"/>
            <Form.Check type="checkbox" label="Northwest Territories" onChange={props.onRegionChange} value="NT"/>
            <Form.Check type="checkbox" label="Nova Scotia" onChange={props.onRegionChange} value="NS"/>
            <Form.Check type="checkbox" label="Nunavut" onChange={props.onRegionChange} value="NU"/>
            <Form.Check type="checkbox" label="Ontario" onChange={props.onRegionChange} value="ON"/>
            <Form.Check type="checkbox" label="Prince Edward Island" onChange={props.onRegionChange} value="PE"/>
            <Form.Check type="checkbox" label="Quebec" onChange={props.onRegionChange} value="QC"/>
            <Form.Check type="checkbox" label="Saskatchewan" onChange={props.onRegionChange} value="SK"/>
            <Form.Check type="checkbox" label="Yukon" onChange={props.onRegionChange} value="YT"/>
          </Form.Group>
        </Collapsible>
        <Collapsible trigger={collapsibleTitle("Type")} triggerWhenOpen={collapsibleTitleOpen("Type")}>
          <Form.Group controlId="filterType">
            <Form.Check type="checkbox" label="Mill" onChange={props.onTypeChange} value="Mill"/>
            <Form.Check type="checkbox" label="Remanufacturer" onChange={props.onTypeChange} value="Remanufacturer"/>
            <Form.Check type="checkbox" label="Wholesaler" onChange={props.onTypeChange} value="Wholesalers"/>
            <Form.Check type="checkbox" label="Exporter" onChange={props.onTypeChange} value="Exporters"/>
            <Form.Check type="checkbox" label="Broker" onChange={props.onTypeChange} value="Brokers"/>
            <Form.Check type="checkbox" label="Shake & Shingle" onChange={props.onTypeChange} value="Shake & Shingle"/>
            <Form.Check type="checkbox" label="Pulp & Paper " onChange={props.onTypeChange} value="Pulp & Paper "/>
            <Form.Check type="checkbox" label="Panel" onChange={props.onTypeChange} value="Panel"/>
          </Form.Group>
        </Collapsible>
        <Collapsible trigger={collapsibleTitle("Product")} triggerWhenOpen={collapsibleTitleOpen("Product")}>
          <Form.Group controlId="filterType">
            <Form.Check type="checkbox" label="Boards" onChange={props.onProductChange} value="Boards"/>
            <Form.Check type="checkbox" label="Dimension" onChange={props.onProductChange} value="Dimension"/>
            <Form.Check type="checkbox" label="Studs" onChange={props.onProductChange} value="studs"/>
            <Form.Check type="checkbox" label="Rough Lumber" onChange={props.onProductChange} value="Rough Lumber"/>
            <Form.Check type="checkbox" label="Timbers" onChange={props.onProductChange} value="Timbers"/>
            <Form.Check type="checkbox" label="Posts" onChange={props.onProductChange} value="Posts"/>
            <Form.Check type="checkbox" label="Poles" onChange={props.onProductChange} value="Poles"/>
            <Form.Check type="checkbox" label="Beams" onChange={props.onProductChange} value="Beams"/>
            <Form.Check type="checkbox" label="OSB" onChange={props.onProductChange} value="OSB"/>
            <Form.Check type="checkbox" label="Plywood" onChange={props.onProductChange} value="Plywood"/>
            <Form.Check type="checkbox" label="MDF" onChange={props.onProductChange} value="MDF"/>
            <Form.Check type="checkbox" label="Particleboard" onChange={props.onProductChange} value="Particleboard"/>
            <Form.Check type="checkbox" label="Veneers" onChange={props.onProductChange} value="Veneers"/>
            <Form.Check type="checkbox" label="Millwork" onChange={props.onProductChange} value="Millwork"/>
            <Form.Check type="checkbox" label="Wood Panels / Panelling" onChange={props.onProductChange} value="Wood Panels / Panelling"/>
            <Form.Check type="checkbox" label="Mouldings" onChange={props.onProductChange} value="Mouldings"/>
            <Form.Check type="checkbox" label="Trims" onChange={props.onProductChange} value="Trims"/>
            <Form.Check type="checkbox" label="Flooring" onChange={props.onProductChange} value="Flooring"/>
            <Form.Check type="checkbox" label="Shingles" onChange={props.onProductChange} value="Shingles"/>
            <Form.Check type="checkbox" label="Shakes" onChange={props.onProductChange} value="Shakes"/>
            <Form.Check type="checkbox" label="Trusses" onChange={props.onProductChange} value="Trusses"/>
            <Form.Check type="checkbox" label="Siding" onChange={props.onProductChange} value="Siding"/>
            <Form.Check type="checkbox" label="Decking" onChange={props.onProductChange} value="Decking"/>
            <Form.Check type="checkbox" label="Fencing" onChange={props.onProductChange} value="Fencing"/>
            <Form.Check type="checkbox" label="Pallet Stock" onChange={props.onProductChange} value="Pallet Stock"/>
            <Form.Check type="checkbox" label="Furring Strips" onChange={props.onProductChange} value="Furring Strips"/>
            <Form.Check type="checkbox" label="Channels" onChange={props.onProductChange} value="Channels"/>
            <Form.Check type="checkbox" label="Bevels" onChange={props.onProductChange} value="Bevels"/>
            <Form.Check type="checkbox" label="Pulp" onChange={props.onProductChange} value="Pulp"/>
            <Form.Check type="checkbox" label="Paper" onChange={props.onProductChange} value="Paper"/>
            <Form.Check type="checkbox" label="Tissue" onChange={props.onProductChange} value="Tissue"/>
            <Form.Check type="checkbox" label="Engineered Wood" onChange={props.onProductChange} value="Engineered Wood"/>
          </Form.Group>
        </Collapsible>
        <Collapsible trigger={collapsibleTitle("Species")} triggerWhenOpen={collapsibleTitleOpen("Species")}>
          <Form.Group controlId="filterType">
            <Form.Check type="checkbox" label="Spruce" onChange={props.onSpeciesChange} value="Spruce"/>
            <Form.Check type="checkbox" label="Pine" onChange={props.onSpeciesChange} value="Pine"/>
            <Form.Check type="checkbox" label="Lodgepole Pine" onChange={props.onSpeciesChange} value="Lodgepole Pine"/>
            <Form.Check type="checkbox" label="Fir" onChange={props.onSpeciesChange} value="Fir"/>
            <Form.Check type="checkbox" label="Douglas Fir" onChange={props.onSpeciesChange} value="Douglas Fir"/>
            <Form.Check type="checkbox" label="Poplar" onChange={props.onSpeciesChange} value="Poplar"/>
            <Form.Check type="checkbox" label="Hemlock" onChange={props.onSpeciesChange} value="Hemlock"/>
            <Form.Check type="checkbox" label="Maple" onChange={props.onSpeciesChange} value="Maple"/>
            <Form.Check type="checkbox" label="Birch" onChange={props.onSpeciesChange} value="Birch"/>
            <Form.Check type="checkbox" label="White Pine" onChange={props.onSpeciesChange} value="White Pine"/>
            <Form.Check type="checkbox" label="Red Pine" onChange={props.onSpeciesChange} value="Boards"/>
            <Form.Check type="checkbox" label="Western Red Cedar" onChange={props.onSpeciesChange} value="Western Red Cedar"/>
            <Form.Check type="checkbox" label="Sitka Spruce" onChange={props.onSpeciesChange} value="Sitka Spruce"/>
            <Form.Check type="checkbox" label="Yellow Cedar" onChange={props.onSpeciesChange} value="Yellow Cedar"/>
            <Form.Check type="checkbox" label="Cypress" onChange={props.onSpeciesChange} value="Cypress"/>
            <Form.Check type="checkbox" label="Balsam" onChange={props.onSpeciesChange} value="Balsam"/>
            <Form.Check type="checkbox" label="Maple" onChange={props.onSpeciesChange} value="Maple"/>
            <Form.Check type="checkbox" label="Oak" onChange={props.onSpeciesChange} value="Oak"/>
            <Form.Check type="checkbox" label="Cherry" onChange={props.onSpeciesChange} value="Cherry"/>
            <Form.Check type="checkbox" label="Hickory" onChange={props.onSpeciesChange} value="Hickory"/>
            <Form.Check type="checkbox" label="Walnut" onChange={props.onSpeciesChange} value="Walnut"/>
            <Form.Check type="checkbox" label="Jack Pine" onChange={props.onSpeciesChange} value="Jack Pine"/>
            <Form.Check type="checkbox" label="Beech" onChange={props.onSpeciesChange} value="Beech"/>
            <Form.Check type="checkbox" label="Alder" onChange={props.onSpeciesChange} value="Alder"/>
            <Form.Check type="checkbox" label="Ash" onChange={props.onSpeciesChange} value="Ash"/>
            <Form.Check type="checkbox" label="Elm" onChange={props.onSpeciesChange} value="Elm"/>
            <Form.Check type="checkbox" label="Walnut" onChange={props.onSpeciesChange} value="Boards"/>
            <Form.Check type="checkbox" label="Sycamore" onChange={props.onSpeciesChange} value="Sycamore"/>
            <Form.Check type="checkbox" label="Basswood" onChange={props.onSpeciesChange} value="Basswood"/>
            <Form.Check type="checkbox" label="Western Spruce-Pine-Fir" onChange={props.onSpeciesChange} value="Western Spruce-Pine-Fir"/>
            <Form.Check type="checkbox" label="Eastern Spruce-Pine-Fir" onChange={props.onSpeciesChange} value="Eastern Spruce-Pine-Fir"/>
          </Form.Group>
        </Collapsible>
          <div>
</div>
      {/* <div className="input-group-btn clear-search">
        <span className="btn btn-default btn-search" onClick={props.reloadMills}>
          <i className={`fa fa-close ${props.searchQuery ? 'visible' : ''}`}></i>
        </span>
        <button className="btn btn-default btn-search" type="submit" onClick={props.handleClick}>
          <i className="glyphicon glyphicon-search"></i>
        </button>
      </div> */}
    </div>
  )
};

SearchMills.propTypes = {
  ref: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onProductChange: PropTypes.func.isRequired,
  onSpeciesChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.func.isRequired,
  reloadMills: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};


export default SearchMills;