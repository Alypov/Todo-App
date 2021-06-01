import React from 'react';

const TodoItem = ({ text, isComplete, created }) => {
  return (
    <div>
      <div>{text}</div>
    </div>
  );
};

export default TodoItem;
