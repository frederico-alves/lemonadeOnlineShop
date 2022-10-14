/*** React Router Imports ***/
import { Link } from "react-router-dom";
/********** REDUX Imports **********/
import { useSelector } from "react-redux";
/**********************************/

const Navbar = () => {
  // Use the useSelector() hook to access the store's state
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  /********************/
  
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>LemonadeShop</h2>
      </Link>
      <div className="right-nav">
        <Link to="/orders">
          <button className="button-nav">History</button>
        </Link>
        <Link to="/cart">
          <button className="button-nav">
            <div className="nav-bag">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span className="bag-quantity">
                    {/* Display Total Quantity in Cart */}
                    <span>{cartTotalQuantity}</span>
                </span>
            </div>
          </button>
        </Link>      
      </div>

    </nav>
  );
};

export default Navbar;
