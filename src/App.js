import React from 'react';
import { Provider } from 'react-redux';
import './index.scss';
import TodoList from './components/TodoList';
import store from './store';
import background from './assets/videos/background.mp4';
import backgroundPoster from './assets/videos/posters/background-poster.png';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <div style={{ zIndex: -1 }}>
          <video
            height="100vh"
            autoPlay
            muted
            loop
            poster={backgroundPoster}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          >
            <source src={background} type="video/mp4" />
          </video>
        </div>
        <div style={{ zIndex: 1 }}>
          <TodoList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
