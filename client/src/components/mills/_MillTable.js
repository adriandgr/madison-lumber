import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MillTableDataRow from './_MillTableDataRow';
import Time from'react-time';

import orderedSections from './millTableSectionOrder';

// By dynamically populating mill table data, deliberate ordering
// of sections is lost. This function steps through ordered section
// names and reorders the mill table data accordingly.
const orderMillData = millData => {
  const findMatch = section => {
    for(let prop of millData) {
      if(prop.sectionName === section) {
        return prop;
      }
    }
  };

  return orderedSections.reduce((ordered, section) => ordered.concat(findMatch(section)), []);
};

const mapTableData = props => {
  // Converts key into sectionName
  const processed = str => str.replace(/([A-Z])/, ' $1');
  const titleized = str => str[0].toUpperCase() + str.slice(1);
  const make = processed => titleized => titleized(processed);
  const sectionName = str => make(processed(str))(titleized);

  const { mill } = props;
  const tableData = [];

  // Filter these keys out; they're not relevant to the table
  const irrelevant = ['__v', '_id', 'slug', 'lastUpdated'];
  const millKeys = Object.keys(mill).filter(key => !irrelevant.includes(key));

  millKeys.forEach(key => {
    // Evaluates whether or not key's value is another object
    // to the end of populating the millKeys dyanimcally
    // Note: this doesn't support any nesting deeper than two levels;
    // you'd have to drop some recursion in to account for more
    if(typeof mill[key] === 'object' && !Array.isArray(mill[key])) {
      // If another obj, grab nested keys, associated content, and create new millKey
      let newKeys = Object.keys(mill[key]);
      newKeys.forEach(newKey => {
        tableData.push({
          sectionName: sectionName(newKey),
          content: mill[key][newKey],
          millKey: `${key}.${newKey}`
        });
      });
    } else {
      // If it isn't, just push normal, surface-level data
      tableData.push({
        sectionName: sectionName(key),
        content: mill[key],
        millKey: key
      });
    }
  });
  return orderMillData(tableData)
}

const MillTable = props => {
  const tableData = mapTableData(props);
  return (
    <table className="table table-bordered table-hover table-striped mill-table">
      <thead>
        <tr>
          <th width='30%'>Data</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, i) => (
          <MillTableDataRow
            key={i}
            isAdmin={props.isAdmin}
            sectionName={data.sectionName}
            content={data.content}
            millKey={data.millKey}
            handleEdit={props.handleEdit} />
        ))}
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
  );
};

MillTable.propTypes = {
  mill: PropTypes.object.isRequired
};

export default MillTable;