import React from 'react';
import { COLORS } from '../../constants/COLORS';
import CustomButton from '../CustomButton';
import './styles.scss';
const TodoItem = ({ text, item, removeTodoHandler, index }) => {
  return (
    <div className="todo-item-main-wrapper">
      <div className="todo-item-title-wrapper">{text}</div>
      <div className="todo-item-button-wrapper">
        <CustomButton
          color={COLORS.removeButton}
          width={90}
          height={'100%'}
          onClick={() => removeTodoHandler(item.id)}
          title="Remove"
        />
      </div>
    </div>
  );
};

export default TodoItem;
