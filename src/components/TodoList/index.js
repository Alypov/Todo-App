import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from '../../store/todoList/actions';
import moment from 'moment';
import CustomButton from '../CustomButton';

import CustomInput from '../CustomInput';
import TodoItem from '../TodoItem';
import './styles.scss';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [storedTodos, setStoredTodos] = useState([]);

  useEffect(() => {
    setStoredTodos(JSON.parse(localStorage.getItem('todos')));
  }, [todos]);

  const [todo, setTodo] = useState({
    id: 1,
    text: '',
    created: moment().format('DD-MM-YYYY'),
  });

  const inputOnChangeHandler = (e) => {
    setTodo((prev) => ({ ...prev, text: e.target.value }));
  };

  const addTodoHandler = () => {
    setTodo((prev) => ({
      ...prev,
      id: prev.id + 1,
    }));

    dispatch(addTodo(todo));
    localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    setTodo((prev) => ({ ...prev, text: '' }));
  };

  const removeTodoHandler = (id) => {
    const filteredArray = todos.filter((item) => item.id !== id);
    dispatch(deleteTodo(filteredArray));
    setStoredTodos(
      localStorage.setItem('todos', JSON.stringify(filteredArray))
    );
  };

  return (
    <div className="todo-list-main-wrapper">
      <div className="todo-list-title">todo app</div>
      <div className="todo-list-input-with-button-wrapper">
        <div className="todo-list-input-wrapper">
          <CustomInput
            height={36}
            width={300}
            placeholder="Enter your todo"
            onChange={(e) => inputOnChangeHandler(e)}
            value={todo.text}
          />
        </div>
        <CustomButton onClick={addTodoHandler} title="ADD TODO" />
      </div>
      <div className="todo-list-list-wrapper">
        {storedTodos?.map((item, index) => (
          <div
            className={`todo-item-render-wrapper${
              item.isComplete ? '-checked' : ''
            }`}
            key={index}
          >
            <TodoItem
              text={item.text}
              isComplete={item.isComplete}
              created={item.created}
            />

            <CustomButton
              width={90}
              height={'100%'}
              onClick={() => removeTodoHandler(item.id)}
              title="Remove"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
