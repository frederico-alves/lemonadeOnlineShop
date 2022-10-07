import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add item to cart
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity++;
            } else {
                const tempItem = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempItem);
            }
            // Local Storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        // Remove all items from cart
        removeAllFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
            state.cartItems = nextCartItems;
            // Local Storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
    }
})

export const { addToCart, removeAllFromCart } = cartSlice.actions;
export default cartSlice.reducer;