/********** REDUX Imports **********/
import { useDispatch } from 'react-redux';
import { addItemToCart, decreaseCartQuantity } from '../redux/cartSlice';
import { useGetProductsQuery } from "../redux/productsApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateCartTotal } from "../redux/cartSlice";
/**********************************/

const Home = () => {
  // Use the useDispatch() hook to dispatch actions to the store
  const dispatch = useDispatch();

  // Use the useSelector() hook to access the store's state
  const cart = useSelector((state) => state.cart);

  // Use the useGetProductsQuery() hook to fetch data from the API
  const {data, error, isLoading } = useGetProductsQuery();

  // Use the useEffect() hook to dispatch calculateCartTotal() action
  // All the time the cart state updates, re-calculate the total amount
  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [cart, dispatch]);

  /***** CLICK EVENTS *****/
  const handleAddItemToCart = (product) => {
    dispatch(addItemToCart(product));
  }
  const handleDecreaseCartQuantity = (cartItem) => {
      dispatch(decreaseCartQuantity(cartItem));
  }
  const handleIncreaseCartQuantity = (cartItem) => {
      dispatch(addItemToCart(cartItem));
  }
  /********************/

  return (
      <div>
      {/* <h1 className='pages-title'>Home Component</h1> */}
      <div className="products">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products</p>
        ) : (
            data.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.imgUrl} alt={product.name} />
                <div className="details">
                  <span>{product.description}</span>
                  <span className="price">{product.price} kr.</span>
                </div>

                {cart.cartItems.find((cartItem) => cartItem.id === product.id) ? (
                  // If the item is in the cart display + - buttons
                  <div className="cart-buttons-home">
                    <button onClick={() => handleDecreaseCartQuantity(product)}>-</button>
                    <span>{cart.cartItems.find((cartItem) => cartItem.id === product.id).cartQuantity}</span>
                    <button onClick={() => handleIncreaseCartQuantity(product)}>+</button>
                  </div>  
                ) : (
                  // If the item is not in the cart display Add to cart button
                  <button onClick={() => handleAddItemToCart(product)}>Add to cart</button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
  );
}

export default Home;