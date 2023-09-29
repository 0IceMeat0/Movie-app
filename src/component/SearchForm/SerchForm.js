import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

export default class SerchForm extends Component {
 
  onSubmit = (evt) => {
    evt.preventDefault();
  };

  render() {
    const { query, onLabelChange } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="input">
        <Input placeholder="Type to search..." value={query} allowClear onChange={onLabelChange} />
      </form>
    );
  }
}
SerchForm.defaultProps = {
  query: '',
  onLabelChange: () => {},
};

SerchForm.propTypes = {
  query: PropTypes.string,
  onLabelChange: PropTypes.func,
};
