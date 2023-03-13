import { useState } from "react";
import { newUser } from "../apiCalls";

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const  handleSubmit =  async e => {
        e.preventDefault();
        setIsLoading(true);
     
        const res = await newUser({ 
          email,
          password
        })
        console.log(res,"this is from signup");
      };

    return (
      <>
      <form className='content-area' onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Signup'}
        </button>
      </form>

      </>
  
    );
  };