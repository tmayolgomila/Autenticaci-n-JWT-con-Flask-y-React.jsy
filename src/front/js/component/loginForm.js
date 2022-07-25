
import React,{ useContext, useState } from 'react';
import { Context } from "../store/appContext";




function LoginForm() {
  const{store, actions}= useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  
  return (
    <form>
  <div className="mb-3" controlId="formBasicEmail">
    <label>Email address</label>
    <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
  </div>
  <div className="mb-3" controlId="formBasicPassword">
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      </div>
  <Button variant="primary" type="submit" onClick={()=>{
    if(email === "" || password === ""){
      alert("campos vacios, rellenar")
    }else{
      actions.signup(email,password)
    };
  }}>
    Submit
  </Button>
</form>
  );
}

export default LoginForm;