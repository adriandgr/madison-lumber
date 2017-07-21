import React from 'react';
import PropTypes from 'prop-types';

const Jumbotron = (props) => (
  <div
    className="jumbotron text-center section-banner"
    style={{backgroundImage: `url(${props.imgSrc})`}}>
    <h1 className="heading-brand">
      {props.heading}
    </h1>
  </div>
)

Jumbotron.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired
}

export default Jumbotron;