import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import productReducer, {fetchProducts} from "./redux/productSlice";
import {productsAPI} from "./redux/productsAPI";
import cartReducer, {calculateCartTotal} from './redux/cartSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware),
})

store.dispatch(fetchProducts());
store.dispatch(calculateCartTotal());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);