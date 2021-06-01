import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import TodoList from './components/TodoList';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
