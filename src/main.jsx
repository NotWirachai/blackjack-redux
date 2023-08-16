// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import App from './App.jsx';
// import AppClass from './AppClass.jsx';
// import store from './redux-saga/store.js'; 

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//     {/* <AppClass/> */}
//   </Provider>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import { createRoot } from 'react-dom/client';
import BlackjackGame from './blackjack.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BlackjackGame />
  </Provider>
);