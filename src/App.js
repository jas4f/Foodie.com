import './App.css';

import React from 'react';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Navbar from './components/Navbar';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './screens/Cart';

function App() {
  return (

    <CartProvider>
     
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </Router>
   
    </CartProvider>
  );
}

export default App;
