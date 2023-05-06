import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './redux/index'
import AuthState from './context/auth/AuthState';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  {/* <AuthState> */}
    <Provider store={store}>
      <App />
    </Provider>
  {/* </AuthState> */}
    
  </>
);

reportWebVitals();
