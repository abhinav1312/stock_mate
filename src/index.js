import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './redux/index'
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)


root.render(
  <>
  {/* <AuthState> */}
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  {/* </AuthState> */}
    
  </>
);

reportWebVitals();
