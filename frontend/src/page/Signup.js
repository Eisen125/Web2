import { useState } from "react";
import { Link } from 'react-router-dom';
import { newUser, existUser } from "../apiCalls";
import "../styles/Signup.css";
import {changeState} from './Store'

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await newUser({
      email,
      password,
    });
    console.log(res, "this is from signup");
    if (typeof res !== 'string') {
      const resForId = await existUser({email,password});
      changeState(resForId.userId);
      window.location = '/';
    } else {
      setError(res);
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
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
          {isLoading ? "Loading..." : "Signup"}
        </button>
        already have an account?<Link to='/login'>click here</Link>
      </form>
    </div>
  );
};