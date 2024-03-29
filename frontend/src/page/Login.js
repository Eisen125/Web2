import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/Login.css";
import { existUser } from "../apiCalls";
import { changeState } from "./Store.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await existUser({ email, password });
    
    if(typeof res!== "string"){
      changeState(res.userId) 
      window.location='/';
    } else {
      setError(res);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
      <p className="error-message">{resError}</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
        don't have an account?<Link to='/signup'>click here</Link>
      </form>
    </div>
  );
};
