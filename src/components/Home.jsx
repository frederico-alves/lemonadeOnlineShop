import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useGetProductsQuery } from "../redux/productsAPI";

const Home = () => {

  const {data, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
      <div>
      <h1 className='pages-title'>Home - List of Products:</h1>
      <div className="products">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products</p>
        ) : (
            data?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.name}</h3>
                <img src={product.imgUrl} alt={product.name} />
                <div className="details">
                  <span>{product.description}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
                
              </div>
            ))
          )}
        </div>
      </div>
  );
}

export default Home;