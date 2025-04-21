/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './ContextReducer';
import myImage from './Images/cover.png'
import './navbar.css'
import Modal from '../Modal';
import Sidebar from './sidebar';
import Cart from '../screens/Cart';
export default function Navbar(props) {

    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')

        navigate("/login")
    }

    const loadCart = () => {
        console.log(cartView);
        setCartView(true)
        console.log(cartView);
    }

    const items = useCart();
    return (
        <>
        <div>

            <nav className="navbar_container">
                <div className="container_fluid">
                    <Link className="navbar_brand" to="/"><img src={myImage} alt="no pic" className='logo'/></Link>
                    <div className="navbar_content" id="navbarSupportedContent">
                            {(localStorage.getItem("token")) ?
                        <ul className="navbar_list">
                           
                                <li className="nav-item">
                                    <Link className="myorder link_nav" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> 
                                </ul> : ""}
                            <div className='search_div'><input className='search_input border-2' placeholder='Search for Food Item' type="search" style={{ width: '30rem' }} /><i class="logo_profile fa-solid fa-magnifying-glass"></i></div>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex register_btn_container">
                                <Link className="login_btn" to="/login">Login</Link>
                                <Link className="signup_btn" to="/signup">Signup</Link>
                            </form> :
                            <div className='cart_logout'>
                                <div className="cart_container" onClick={loadCart}>
                                    <Badge color="secondary"  badgeContent={items.length}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                                 <Sidebar /> 
                                 </div>
 } </div>
                </div>
            </nav>
        </div>
        </>
    )
}
