import React from "react";

import { App } from './App';

import { CurrentContextProvider } from "./context/currentContext";
import { Provider } from "react-redux";
import { store } from "./store/store";


import ReactDOM from 'react-dom';

window.addEventListener('load', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});


export const Index = () => (
  <Provider store={store}>
    <CurrentContextProvider>
      <App />
    </CurrentContextProvider>
  </Provider>
);