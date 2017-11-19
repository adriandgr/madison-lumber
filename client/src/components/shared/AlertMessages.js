import React from 'react';
import PropTypes from 'prop-types';
import scroll from '../../utils/scrollTo';

const AlertMessages = props => {
  let msgCount = 0;
  let infoCount = 0;
  let errCount = 0;

  if(((props.success && props.success.length > 0) ||
      (props.errors && props.errors.length > 0) ||
      (props.info && props.info.length > 0)) &&
       props.scroll) {
    scroll.to('.alert-messages');
  }
  if (props.success || props.errors || props.info) {
    return (
      <div className="alert-messages">
        { props.success && props.success.length > 0 &&
          <div className="alert alert-success">
            {props.success.map((msg, i) => {
              msgCount++;
              return (
              <span key={`msg${msgCount}`}>
                { i === 0
                  ? <strong>{msg} <br/></strong>
                  : <span>{msg} <br/></span> }
              </span>
              )
            })}
          </div>
        }

        { props.info && props.info.length > 0 &&
          <div className="alert alert-info">
            {props.info.map((info, i) => {
              infoCount++;
              return (
              <span key={`info${infoCount}`}>
                { i === 0
                  ? <strong><i className="fa fa-info-circle" aria-hidden="true"></i> {info} <br/></strong>
                  : <span>{info} <br/></span> }
              </span>
              )
            })}
          </div>
        }

        { props.errors && props.errors.length > 0 &&
          <div className="alert alert-danger">
            {props.errors.map((err, i) => {
              errCount++;
              return (
              <span key={`err${errCount}`}>
                { i === 0
                  ? <strong>{err} <br/></strong>
                  : <span>{err} <br/></span> }
              </span>
              )
            })}
          </div>
        }
      </div>
    )
  } else {
    return null;
  }
};

AlertMessages.propTypes = {
  success: PropTypes.array,
  errors: PropTypes.array,
  info: PropTypes.array
};

export default AlertMessages;