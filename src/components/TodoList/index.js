import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, getTodos } from '../../store/todoList/actions';
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

  const [validationAlert, setValidationAlert] = useState([
    // { isEnglish: Boolean(todo.text.match('^[A-Za-z0-9]+$')) },
    { isEmpty: false },
  ]);

  const errors = {
    // isEnglish: 'eng characters only',
    isEmpty: "todo can't be an empty sting",
  };

  const displayAlerts = () => {
    const triggeredAlerts = validationAlert.filter(
      (item) => item[Object.keys(item)[1]] === true
    );

    const displayedAlerts = triggeredAlerts.filter(
      (item) => Object.keys(item)[1] === Object.keys(errors)[0]
    );

    return displayedAlerts.map((item) => errors[Object.keys(item)]);
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('todos'))) {
      localStorage.setItem('todos', '[]');
    }
    dispatch(getTodos(localStorage.getItem('todos')));
  }, []);

  const inputOnChangeHandler = (e) => {
    if (e.target.value === '') {
      // setValidationAlert((prev) => [{ ...prev, isEmpty: true }]);
      setValidationAlert((prev) => [...prev, { isEmpty: true }]);
      setTodo((prev) => ({ ...prev, text: e.target.value }));
    } else {
      setTodo((prev) => ({ ...prev, text: e.target.value }));
      setValidationAlert((prev) => [...prev, { isEmpty: true }]);
    }
  };

  const addTodoHandler = () => {
    if (todo.text.trim() !== '' && displayAlerts() == false) {
      setTodo((prev) => ({
        ...prev,
        id: uuid(),
      }));

      dispatch(addTodo(todo));
      localStorage.setItem('todos', JSON.stringify([...todos, todo]));
      setTodo((prev) => ({ ...prev, text: '' }));
    }
  };

  const removeTodoHandler = (id) => {
    const filteredArray = todos.filter((item) => item.id !== id);
    dispatch(deleteTodo(filteredArray));
    localStorage.setItem('todos', JSON.stringify(filteredArray));
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
      <div className="todo-input-alert-wrapper">
        {displayAlerts().map((alert) => (
          <div>{alert}</div>
        ))}
      </div>

      <div className="todo-list-list-wrapper">
        {todos?.map((item, index) => (
          <div className="todo-item-render-wrapper" key={index}>
            <TodoItem
              index={index}
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
