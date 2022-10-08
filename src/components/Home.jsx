import { useDispatch } from 'react-redux';
import { addItemToCart, decreaseCartQuantity } from '../redux/cartSlice';
import { useGetProductsQuery } from "../redux/productsApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateCartTotal } from "../redux/cartSlice";

const Home = () => {
  const cart = useSelector((state) => state.cart);
  const {data, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();

  // All the time the cart state updates, re-calculate the total amount
  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [cart, dispatch]);

  /*** CLICK EVENTS ***/
  const handleAddItemToCart = (product) => {
    dispatch(addItemToCart(product));
  }

  const handleDecreaseCartQuantity = (cartItem) => {
      dispatch(decreaseCartQuantity(cartItem));
  }

  const handleIncreaseCartQuantity = (cartItem) => {
      dispatch(addItemToCart(cartItem));
  }
  /******************/

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
                  <div className="cart-buttons-home">
                    <button onClick={() => handleDecreaseCartQuantity(product)}>-</button>
                    <span>{cart.cartItems.find((cartItem) => cartItem.id === product.id).cartQuantity}</span>
                    <button onClick={() => handleIncreaseCartQuantity(product)}>+</button>
                  </div>
                ) : (
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