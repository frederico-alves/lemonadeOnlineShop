/*** CSS Styling Import ***/
import './App.css';
/*** React Router Imports ***/
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
/*** Components Imports ***/
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Notfound from "./components/Notfound";
/**********************************/

function App() {
  return (
    <div className="App">
      {/* Wrap all the components with <BrowserRouter> */}
      <BrowserRouter>
        <Navbar />
        <div className="content-container">
          {/* Use <Route path='%'> to render components based on the URL */}
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/orders' element={<Orders/>} />
            <Route path='/not-found' element={<Notfound/>} />
            <Route path='*' element={<Navigate to='/not-found' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;