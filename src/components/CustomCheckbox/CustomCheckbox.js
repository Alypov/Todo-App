import React from 'react';
import { Checkbox } from 'antd';

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <div>
      <Checkbox checked={checked} onChange={onChange} />
    </div>
  );
};

export default CustomCheckbox;
