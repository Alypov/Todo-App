import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from '../../store/todoList/actions';
import moment from 'moment';
import CustomButton from '../CustomButton';
import uuid from 'react-uuid';

import CustomInput from '../CustomInput';
import TodoItem from '../TodoItem';
import './styles.scss';
import { COLORS } from '../../constants/COLORS';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [storedTodos, setStoredTodos] = useState(
    JSON.parse(localStorage.getItem('todos'))
  );
  const [todo, setTodo] = useState({
    id: uuid(),
    text: '',
    created: moment().format('DD-MM-YYYY'),
  });

  const validationAlert = [
    { isEnglish: Boolean(todo.text.match('^[a-zA-Z]*$')) },
    { isEmpty: Boolean(todo.text !== '') },
  ];

  const errors = {
    isEnglish: 'eng characters only',
    isEmpty: "todo can't be an empty sting",
  };

  const displayAlerts = () => {
    const triggeredAlerts = validationAlert.filter(
      (item) => item[Object.keys(item)] !== true
    );
    const displayedAlerts = triggeredAlerts.filter(
      (item) => Object.keys(item) !== Object.keys(errors)
    );

    return displayedAlerts.map((item) => errors[Object.keys(item)]);
  };

  useEffect(() => {
    setStoredTodos(JSON.parse(localStorage.getItem('todos')));
  }, [todos]);

  const inputOnChangeHandler = (e) => {
    setTodo((prev) => ({ ...prev, text: e.target.value }));
  };

  const addTodoHandler = () => {
    if (todo.text.trim() !== '' && displayAlerts() == false) {
      setTodo((prev) => ({
        ...prev,
        id: uuid(),
      }));

      dispatch(addTodo(todo));
      localStorage.setItem('todos', JSON.stringify([...storedTodos, todo]));
      setTodo((prev) => ({ ...prev, text: '' }));
    }
  };

  const removeTodoHandler = (id) => {
    const filteredArray = storedTodos.filter((item) => item.id !== id);
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
            placeholder="What are you going to do now?"
            onChange={(e) => inputOnChangeHandler(e)}
            value={todo.text}
          />
        </div>
        <div className="todo-list-add-todo-button">
          <CustomButton
            color={COLORS.addButton}
            onClick={addTodoHandler}
            title="ADD TODO"
          />
        </div>
      </div>
      <div>{displayAlerts()}</div>

      <div className="todo-list-list-wrapper">
        {storedTodos?.map((item, index) => (
          <div className="todo-item-render-wrapper" key={index}>
            <TodoItem
              item={item}
              text={item.text}
              isComplete={item.isComplete}
              created={item.created}
              removeTodoHandler={removeTodoHandler}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
