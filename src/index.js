import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AlertState from './context/alert/AlertState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AlertState>
      <App />
    </AlertState>
  </>
);

reportWebVitals();
