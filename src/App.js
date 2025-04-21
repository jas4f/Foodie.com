import './App.css';

import React from 'react';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
// import Navbar from './components/Navbar';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cart from './screens/Cart';
import ResetPassword from './screens/ResetPassword';
import PrivateRoutes from './screens/ProtectedRoute'
function App() {
  return (

    <CartProvider>
     
      <Router>
        <AppContent />
      </Router>
   
    </CartProvider>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isLoginOrSignupPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isLoginOrSignupPage && <Navbar />}
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
          <Route exact path="/myorder" element={<MyOrder />} />
          <Route exact path="/cart" element={<Cart />} />
          </Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </div>
      {!isLoginOrSignupPage && <Footer />}
    </>
  );
};


export default App;
