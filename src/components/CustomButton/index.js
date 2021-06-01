import React from 'react';
import './styles.scss';

const CustomButton = ({ title, onClick }) => {
  return (
    <div className="custom-button-wrapper">
      <div className='custom-button' onClick={onClick}>{title}</div>
    </div>
  );
};

export default CustomButton;
