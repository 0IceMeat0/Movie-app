import React, {Component} from 'react';
import './footer.css';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  render(){
    const { currentPage, onPageChange, totalMovies } = this.props
    const handlePageChange = (pageNumber) => {
      onPageChange(pageNumber); 
    };
  
    return (
      <Pagination
       current={currentPage}
       showSizeChanger={false}
       showLessItems={false}
        total={totalMovies}
        className="footer"
        onChange={handlePageChange}
      />
    );
  }
  }
   

Footer.defaultProps = {
  onPageChange: () => {},
  totalMovies: 0,
  currentPage: 1,
};

Footer.propTypes = {
  onPageChange: PropTypes.func,
  totalMovies: PropTypes.number,
  currentPage: PropTypes.number,
};
