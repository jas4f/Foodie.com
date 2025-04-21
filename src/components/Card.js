
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
import { ToastContainer, toast } from 'react-toastify';

// import { Dropdown, DropdownButton } from 'react-bootstrap';
import './Card.css';
export default function Card(props) {
  let data = useCart();
  const notify = () => toast("Wow so easy!");
  <ToastContainer />

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const [mess,setMess] = useState('');
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  // const handleQty = (e) => {
  //   setQty(e.target.value);
  // }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async (event) => {
    event.preventDefault();
    toast("add to cart successfully !!");
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    // setMess('Add to cart successfully ✅');
    // console.log('data is : ',data)
    // console.log(new Date())
    if (food.length) {
       
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        console.log(foodItem._id,foodItem.name,finalPrice,qty,size,props.ImgSrc);

        setMess('Add to cart successfully ✅');
        return
      }
      return
    }
    // console.log(foodItem._id,foodItem.name,finalPrice,qty,size,props.ImgSrc);
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })

    
    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="container_2" style={{ width: "16rem" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="carsetMessd-title">{props.foodName}</h5>
          <div className='handle_count'>
            <span className='btn-count' onClick={()=>{if(qty > 1){setQty(qty-1)}}}>-</span>
            <input className='items_count' value={qty} type="text" />
            <span className='btn-count' onClick={()=>{setQty(qty + 1)}}>+</span>
          </div>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='price_and_size_container' style={{ height: "38px" }}>
            {/* <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select> */}
            <select className="size_of_item"  ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className='final_price_item' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button className='add_to_cart_btn addcart' onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className='add_to_cart_btn viewcart' onClick={handleAddToCart}>view Cart</button> */}
          {mess && <h2>{mess}</h2>}
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
