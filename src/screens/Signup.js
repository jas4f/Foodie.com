import React, { useState } from 'react'
import {Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import  myImage  from '../components/Images/cover.png'
export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [address, setAddress] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.token)
 
    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='flex bg-gray-100 justify-center items-center h-[100vh] gap-30'>
      <div>
        <h3 className='text-black font-lighter text-center'><span className='font-extralight text-5xl'>Welcome</span> <br /><span className='font-light text-3xl pt-3'>To</span></h3>
      <img src={myImage} alt="no pic" className='logo' />
      </div>
      <div className='w-95' >
          <form className=' m-auto pt-4 border bg-dark border-success p-4' onSubmit={handleSubmit}>
          <h2 className='text-center text-gray-100 font-light'>Sign Up</h2>

            <div className="m-3">
              <label htmlFor="name" className="form-label text-white">Name</label>
              <input type="text" className="border block w-100 p-2 text-white" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" placeholder='Enter the name'/>
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label text-white">Email address</label>
            <input type="email" className="border block w-100 p-2 text-white" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label text-white">Address</label>
              <fieldset>
              <input type="text" className="border block w-100 p-2 text-white" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
            <input type="password" className="border block w-100 p-2 text-white" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="mt-2 w-80 bg-green-300 p-2  hover:text-green-300 hover:bg-transparent hover:border-2">Submit</button>
            <p className="text-white mt-2">Already have an account ?</p>
            <Link to="/login" className='decoration-0'>Sign In</Link>

          </form>
        </div>
    </div>
  )
}