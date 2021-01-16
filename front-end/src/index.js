import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css'

// Redux Store는 객체인 Actions만 받을 수 있다.
// 그런데 Store에서 Promise와 Functions형태를 받아야할 때가 있는데 그 때 redux-promise와 redux-thunk Middleware가 처리를 해준다.
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'

const createStoreWidthMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <React.StrictMode> 
    {/* Provider : React랑 Redux랑 연결시킨다. */}
    <Provider
        store={createStoreWidthMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
          )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
