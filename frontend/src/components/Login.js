
import { useState } from 'react';
import { existUser } from '../apiCalls';

 export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const  handleSubmit =  async e => {
    e.preventDefault();
    setIsLoading(true);
 
    const res = await existUser({ 
      email,
      password
    })
    console.log(res,"this is from login");
  };


  return (
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
        onChange={e=> setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};
