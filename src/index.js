import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import productReducer, {fetchProducts} from "./redux/productSlice";
import {productsAPI} from "./redux/productsAPI";

const store = configureStore({
    reducer: {
        products: productReducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware),
})

store.dispatch(fetchProducts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);