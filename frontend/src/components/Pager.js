import React from 'react'
import PropTypes from 'prop-types'

function Pager(props) {
  const isFirst = props.currentPage === 1
  return (
    <div className="container container__pagination">
      <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
        <a className="pagination-previous" title="This is the first page" disabled={isFirst}>Previous</a>
        <a className="pagination-next">Next page</a>
        <ul className="pagination-list">
          <li><a className="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a></li>
          <li><a className="pagination-link" aria-label="Goto page 2">2</a></li>
          <li><a className="pagination-link" aria-label="Goto page 3" >3</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label={`Goto page ${props.pageCount}`}>{props.pageCount}</a></li>
        </ul>
      </nav>
    </div>
  )
}

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired
}

export default Pager