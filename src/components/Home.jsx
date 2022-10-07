import data from '../data/products.json';
const Home = () => {
    return (
        <div>
        <h1 className='pages-title'>Home - List of Products:</h1>
        <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.imgUrl} alt={product.name} />
                  <div className="details">
                    <span>{product.description}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
    );
}

export default Home;