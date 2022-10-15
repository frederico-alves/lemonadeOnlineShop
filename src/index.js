/*** REACT Imports ***/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
/*** REDUX Imports ***/
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import productReducer, {fetchProducts} from "./redux/productSlice";
import {productsApi} from "./redux/productsApi";
import cartReducer, {calculateCartTotal} from './redux/cartSlice';;

// Create REDUX store
const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})
// Dispatch fetchProducts REDUX action
store.dispatch(fetchProducts());
store.dispatch(calculateCartTotal());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap REDUX Store Provider to App component*/}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);