import React from 'react';
import { Input } from 'antd';
const CustomInput = ({ placeholder, onChange, value }) => {
  return (
    <div className="custom-input-main-wrapper">
      <Input placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
};

export default CustomInput;
