import React from 'react';
import './styles.scss';

const CustomButton = ({ title, onClick, width, height }) => {
  return (
    <div
      style={{ width: width, height: height }}
      className="custom-button-wrapper"
    >
      <div className="custom-button" onClick={onClick}>
        {title}
      </div>
    </div>
  );
};

export default CustomButton;
