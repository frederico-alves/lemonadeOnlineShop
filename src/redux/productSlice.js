/********** REDUX TOOLKIT - createAsyncThunk  **********/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    status: null
}

// Create a thunk to fetch products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch(process.env.PUBLIC_URL + '/data/products.json');
    const data = await response.json();
    return data;
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.products = action.payload;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.status = 'rejected';
        }
    }
})

export default productSlice.reducer;