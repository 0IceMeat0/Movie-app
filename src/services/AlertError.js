import React from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';
import './alerterror.css';

function AlertError({ errorMessage }) {
  return <Alert message="Hi! " description={errorMessage} type="error" className="alert-error" />;
}

AlertError.defaultProps = {
  errorMessage: '',
};

AlertError.propTypes = {
  errorMessage: PropTypes.string,
};

export default AlertError;