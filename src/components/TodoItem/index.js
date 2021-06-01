import React from 'react';
import './styles.scss'
const TodoItem = ({ text, isComplete, created }) => {
  return (
    <div>
      <div className='todo-item-title-wrapper'>{text}</div>
    </div>
  );
};

export default TodoItem;
