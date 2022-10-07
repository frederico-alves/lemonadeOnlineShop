import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Notfound from "./components/Notfound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/not-found' element={<Notfound/>} />
            <Route path='*' element={<Navigate to='/not-found' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;