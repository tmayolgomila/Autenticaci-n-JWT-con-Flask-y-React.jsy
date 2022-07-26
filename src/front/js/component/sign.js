import { Action } from "history";
import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from "../store/appContext";





export const SignUp =()=> {
  const{store, actions}= useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")


  
  return (

    <form>
        <div className="mb-3">
        <label>Username</label>
        <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter username" />
       
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
       
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      </div>
      <div className="mb-3">
      </div>
      <Button variant="primary" type="submit" onClick={()=>{
    if(email === "" || password === "" || username === ""){
      alert("campos vacios, rellenar")
    }else{
      actions.signup(email,password,username)
      
    }
  }}>
        Submit
      </Button>
    </form>
  );
}

export default SignUp;