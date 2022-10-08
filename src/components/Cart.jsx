/*** React Router Link Import ***/
import {Link} from "react-router-dom";
/*** React useEffect Import ***/
import { useEffect } from "react";
/********** REDUX Imports **********/
import {useSelector, useDispatch} from "react-redux";
import { removeItemFromCart, decreaseCartQuantity, addItemToCart, clearCart, calculateCartTotal } from "../redux/cartSlice";
/**********************************/
const Cart = () => {
    // Use the useDispatch() hook to dispatch actions to the store
    const dispatch = useDispatch();
    // Use the useSelector() hook to access the store's state
    const cart = useSelector((state) => state.cart);

    // Use the useEffect() hook to dispatch calculateCartTotal() action
    // All the time the cart state updates, re-calculate the total amount
    useEffect(() => {
        dispatch(calculateCartTotal());
    }, [cart, dispatch]);

    /*** CLICK EVENTS ***/
    const handleRemoveItemFromCart = (cartItem) => {
        dispatch(removeItemFromCart(cartItem));
    }
    const handleDecreaseCartQuantity = (cartItem) => {
        dispatch(decreaseCartQuantity(cartItem));
    }
    const handleIncreaseCartQuantity = (cartItem) => {
        dispatch(addItemToCart(cartItem));
    }
    const handleClearCart = () => {
        dispatch(clearCart());
    }
    /******************/

    return (
        <div className="cart-container">
            {cart.cartItems.length === 0 ? (
            // If cartItems is equal to 0 displays 'Cart is empty'
            <div className="cart-empty">
                <h3>Cart is empty</h3>
                <div className="start-shopping">
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
            // otherwise if cartItems is >1 displays Shopping Cart
            ) : (
                <div>
                    <h1 className="pages-title">Shopping Cart</h1>
                    <div className="titles">
                        <h3 className="product-title">Products</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {cart.cartItems.map((cartItem) => (
                            // Displays all the items in the cart
                            <div className="cart-item" key={cartItem.id}>
                                <div className="cart-product">
                                    <img src={cartItem.imgUrl} alt={cartItem.name} />
                                    <div>
                                        <h3>{cartItem.name}</h3>
                                        <p>{cartItem.desc}</p>
                                        <button onClick={() => handleRemoveItemFromCart(cartItem)}>Remove</button>
                                    </div>
                                </div>
                                <div className="cart-product-price">
                                    <p>{cartItem.price} kr.</p>
                                </div>
                                <div className="cart-product-quantity">
                                    <button onClick={() => handleDecreaseCartQuantity(cartItem)}>-</button>
                                    <div className="count">{cartItem.cartQuantity}</div>
                                    <button onClick={() => handleIncreaseCartQuantity(cartItem)}>+</button>
                                </div>
                                <div className="cart-product-total-price">
                                    {parseFloat((cartItem.price * cartItem.cartQuantity).toFixed(2))} kr.
                                </div>
                            </div>
                        ))}
                        <div className="cart-summary">
                            <button className="clear-cart" onClick={() => handleClearCart()}>Clear Cart</button>
                            <div className="cart-checkout">
                                <div className="subtotal">
                                    <span>Subtotal</span>
                                    <span className="amount">{cart.cartTotalAmount} kr.</span>
                                </div>
                                <p>Taxes and shipping calculated at checkout</p>
                                <button>Checkout</button>
                                <div className="continue-shopping">
                                    <Link to="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                        </svg>
                                        <span>Continue Shopping</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
