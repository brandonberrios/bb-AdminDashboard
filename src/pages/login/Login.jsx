import React from 'react';
import { useState } from 'react';
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext";




const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navigate("/")
      })
      .catch((error) => {
        setError(true)
     });
   
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Powered by Voltage</h1>
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
        <h3>Supercharge your business</h3>
      </form>
    </div>
  );
};

export default Login;