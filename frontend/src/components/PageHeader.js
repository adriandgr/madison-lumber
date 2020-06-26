import React from "react"
import PropTypes from 'prop-types'

function PageHeader(props) {
  const isMedium = props.medium ? 'is-medium ' : ''
  return (
    <section className={`hero ${isMedium}is-primary is-bold has-background`}>
      <img className="hero-background is-transparent" src={props.heroImg} alt="hero-background"/>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            {props.title}
          </h1>
          {props.subtitle &&
          <h2 className="subtitle">
            {props.subtitle}
          </h2>}
        </div>
      </div>
    </section>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  heroImg: PropTypes.string.isRequired,
  medium: PropTypes.bool
}

export default PageHeader