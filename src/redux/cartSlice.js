/********** REDUX - createSlice  **********/
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
        addItemToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity++;
            } else {
                const tempItem = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempItem);
            }
            // Save to Local Storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        // Remove item from cart
        removeItemFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
            state.cartItems = nextCartItems;
            // Save to Local Storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        // Decrease item quantity in cart
        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            // If cartQuantity is > 1, reduce -1 quantity from cart
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity--;
            } else {
                // If cartQuantity is equal or bellow to 0 remove item from cart
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
                state.cartItems = nextCartItems;
            }
            // Save to Local Storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        // Clear cart
        clearCart(state) {
            state.cartItems = [];
            // Save to Local Storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        // Calculate cart total amount
        calculateCartTotal(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const { addItemToCart, removeItemFromCart, decreaseCartQuantity, clearCart, calculateCartTotal } = cartSlice.actions;
export default cartSlice.reducer;