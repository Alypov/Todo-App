import { ADD_TODO, DELETE_TODO, SET_COMPLETE } from './actions';

const initialState = {
  todos: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: [...action.payload],
      };
    }
    case SET_COMPLETE: {

      return {
        ...state,
        todos: action.payload
      };
    }
    default:
      return state;
  }
};
