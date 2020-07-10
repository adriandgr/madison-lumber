import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"

function Table(props) {

  const itemKeys = Object.keys(props.items[0])
  const tableHeaders = itemKeys.map(field =>(
    <th key={field}>{field}</th>
  ))
  // <tr class="is-selected">

  const tableRows = props.items.map(item => (
    <tr key={item[props.keyName]}>
      {Object.values(item).map(data=> (
        <td><Link to="yolo">{data}</Link></td>
      ))}
    </tr>
  ))
  return (
    <table class="table is-hoverable is-fullwidth">
  <thead>
    <tr>{tableHeaders}</tr>
  </thead>
  <tbody>
    
    {tableRows}
    </tbody>
</table>
  )
}

Table.propTypes = {
  items: PropTypes.array.isRequired,
  keyName: PropTypes.string.isRequired
}

export default Table