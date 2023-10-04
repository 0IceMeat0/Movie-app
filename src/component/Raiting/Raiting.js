import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Raiting.css';

export default class Raiting extends Component {
  render(){
   const {vote_average } = this.props;
   const value = vote_average.toFixed(1);
  let color;
  if (value < 3) {
    color = '#E90000';
  } else if (value >= 3 && value < 5) {
    color = '#E97E00';
  } else if (value >= 5 && value < 7) {
    color = '#E9D100';
  } else {
    color = '#66E900';
  }
  return (
    <div className="item__average" style={{ borderColor: color }}>
      <span className="average__value">{value}</span>
    </div>
  );
  }
}

PropTypes.defaultProps = {
  vote_average: 0,
};

PropTypes.propTypes = {
  vote_average: PropTypes.number,
};
