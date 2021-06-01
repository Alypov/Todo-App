import React from 'react';

const CustomButton = ({ title, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{title}</button>
    </div>
  );
};

export default CustomButton;
