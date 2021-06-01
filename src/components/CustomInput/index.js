import React from 'react';
import { Input } from 'antd';
import './styles.scss';
const CustomInput = ({ placeholder, onChange, value, height, width }) => {
  return (
    <div className="custom-input-main-wrapper">
      <Input
        style={{ height: height, width: width }}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
