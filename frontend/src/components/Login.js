import   Axios from 'axios';
import { useState } from 'react';
import { test } from '../apiCalls';

// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
//   };
  

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

 export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [exist,setExist] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const  handleSubmit =  async e => {
    e.preventDefault();
    setIsLoading(true);
    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     setIsLoading(false);
    //     // Redirect to the home page or any other page
    //   })
    //   .catch(error => {
    //     setError(error);
    //     setIsLoading(false);
    //   });
    const res = await test({ 
      email,
      password
    })
    if (res == 402)
    {
      setExist(true)
    }
    console.log(res);
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
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
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {error && <p>{error.message}</p>}
    </form>
    {exist && <h2>User already exists !</h2>}
    </>
  );
};
