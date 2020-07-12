import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

function MillCards(props) {
  function calcKey(row) {
    return row.map(mill => mill.uuid).reduce((acc, cur) => acc + cur)
  }
  
  function mapMills(mills, chunkSize) {
    const rows = [];
    for (var i = 0; i < mills.length; i += chunkSize)
      rows.push(mills.slice(i, i + chunkSize));
    return rows;
  }

  const mills = mapMills(props.mills, props.columns)

  const cards = mills.map((millRow) => (
    <div className="tile is-ancestor" key={calcKey(millRow)}>
      <div className="tile is-parent">
        {millRow.map((mill) => (
          <div className="tile is-3 is-child tile__mill" key={mill.uuid}>
            <Link to={`/mill/${mill.uuid}`}>
              <div className="card card__mill">
                <div className="card-image">
                  <figure className="image is-4by2">
                    <img
                      src="https://placehold.co/1200x600"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    
                    <div className="media-content">
                      <p className="title is-6">{mill.type}</p>
                      <p className="subtitle is-6">{mill.name}</p>
                    </div>
                  </div>

                  <div className="content">
                    <a>{mill.region}</a>
                    
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ));
  return <div className="container container__mill_cards">{cards}</div>;
}

MillCards.propTypes = {
  mills: PropTypes.array.isRequired
}

export default MillCards