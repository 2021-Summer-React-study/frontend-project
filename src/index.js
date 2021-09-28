// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
// // import
// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// // createSagaMiddleware import
// import createSagaMiddleware from 'redux-saga'
// // root Saga import
// import rootReducer, {rootSaga} from './modules/index';
// // saga middleware 생성
// const sagaMiddleware = createSagaMiddleware();
// // store 적용
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// // saga 실행
// sagaMiddleware.run(rootSaga);

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root'),
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
// user module import
import { tempSetUser, check } from './modules/user';
// HelmetProvider
import { HelmetProvider } from 'react-helmet-async';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

// loadUser func.
function loadUser() {
  try {
    // user key 값으로 value 가져옴.
    const user = localStorage.getItem('user');
    // user 값이 없다면 아무것도 리턴하지 않음.
    if (!user) return;
    // user 값이 있다면 parse 로 user의 정보를 JSON.parse 로 가져옴. 그리고 tempSetUser 액션 생성함수를 디스패치
    store.dispatch(tempSetUser(JSON.parse(user)));
    // check 액션 생성 함수 역시 디스패치
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
// 사가를 먼저 호출하고 해당 함수를 실행하여야 CHECK 액션을 디스패치해서 이를 사가에서 제대로 처리함.
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
