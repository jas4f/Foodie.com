import React, { useState } from 'react'
 import {  Link } from 'react-router-dom'
 import myImage from '../components/Images/cover.png'
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.token)
      navigator()
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
              <h2 className='text-center text-gray-100 font-light'>Log In</h2>
    
                
                <div className="m-3">
                  <label htmlFor="email" className="form-label text-white">Email address</label>
                <input type="email" className="border block w-100 p-2 text-white" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
               
                <div className="m-3">
                  <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                <input type="password" className="border block w-100 p-2 text-white" value={credentials.password} onChange={onChange} name='password' />
                </div>
                <button type="submit" className="mt-2 w-80 bg-green-300 p-2  hover:text-green-300 hover:bg-transparent hover:border-2">Submit</button>
                <p className="text-white mt-2">Having not account?</p>
                <Link to="/signup" className='decoration-0'>Sign Up</Link>
  
              </form>
            </div>
        </div>

 
  )
}


// , 'Accept': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000/login', 'Access-Control-Allow-Credentials': 'true',
//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'