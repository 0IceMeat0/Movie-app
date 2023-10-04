import React, {Component} from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';
import './alerterror.css';


export default class AlertError extends Component  {
  render(){
    const { errorMessage } = this.props;

  return <Alert message="Hi! " description={errorMessage} type="error" className="alert-error" />;
}}

AlertError.defaultProps = {
  errorMessage: '',
};

AlertError.propTypes = {
  errorMessage: PropTypes.string,
};