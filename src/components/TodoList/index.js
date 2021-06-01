import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  setCompleteTodo,
} from '../../store/todoList/actions';
import CustomButton from '../CustomButton';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import CustomInput from '../CustomInput';
import TodoItem from '../TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  const [todo, setTodo] = useState({
    id: 1,
    text: '',
    isComplete: false,
    created: '',
  });

  const inputOnChangeHandler = (e) => {
    setTodo((prev) => ({ ...prev, text: e.target.value }));
  };

  const onClickButtonHandler = () => {
    setTodo((prev) => ({ ...prev, id: prev.id + 1 }));
    dispatch(addTodo(todo));
  };

  const removeTodoHandler = (id) => {
    const filteredArray = todos.filter((item) => item.id !== id);
    dispatch(deleteTodo(filteredArray));
  };

  const setDone = (e, id) => {
    const result = todos.find((item) => item.id === id);
    const filteredArray = todos.filter((item) => item.id !== id);

    setTodo({ ...result, isComplete: !todo.isComplete });

    dispatch(setCompleteTodo([...filteredArray, todo]));
    console.log();
  };

  return (
    <div className="todo-list-main-wrapper">
      <div className="todo-list-input-wrapper">
        <CustomInput
          placeholder="Enter your todo"
          onChange={(e) => inputOnChangeHandler(e)}
          value={todo.text}
        />
        <CustomButton onClick={onClickButtonHandler} title="ADD TODO" />
      </div>
      <div className="todo-list-list-wrapper">
        {todos?.map((item, index) => (
          <div key={index}>
            <TodoItem
              text={item.text}
              isComplete={item.isComplete}
              created={item.created}
            />
            {item.isComplete ? (
              <div>
                <CustomButton
                  onClick={() => removeTodoHandler(item.id)}
                  title="Remove Todo"
                />
                <CustomCheckbox
                  checked={item.isComplete}
                  onChange={(e) => setDone(e, item.id)}
                />
              </div>
            ) : (
              <CustomCheckbox
                checked={item.isComplete}
                onChange={(e) => setDone(e, item.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
