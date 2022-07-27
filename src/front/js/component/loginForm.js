
import React,{ useContext, useState } from 'react';
import { Context } from "../store/appContext";




function LoginForm() {
  const{store, actions}= useContext(Context)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  
  return (
    <form>
  <div className="mb-3">
    <label>username</label>
    <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter username" />
  </div>
  <div className="mb-3">
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      </div>
  <button variant="primary" type="submit" onClick={()=>{
    if(username === "" || password === ""){
      alert("campos vacios, rellenar")
    }else{
      actions.signup(username,password)
    };
  }}>
    Submit
  </button>
</form>
  );
}

export default LoginForm;