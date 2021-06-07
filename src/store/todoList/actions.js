export const GET_TODOS = 'GET_TODOS';
export const getTodos = () => {
  return {
    type: GET_TODOS,
    payload: JSON.parse(localStorage.getItem('todos')),
  };
};

export const ADD_TODO = 'ADD_TODO';
export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
    meta: {
      asPromise: true,
    },
  };
};

export const SET_COMPLETE = 'SET_COMPLETE';
export const setCompleteTodo = (payload) => {
  return {
    type: SET_COMPLETE,
    payload,
  };
};

export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};
