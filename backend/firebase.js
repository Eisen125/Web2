
import  {initializeApp}  from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
 
} from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBg5pRJHFogWVllnpnHVk-yAzF3m-v4e7s",
    authDomain: "my-shows-68146.firebaseapp.com",
    projectId: "my-shows-68146",
    storageBucket: "my-shows-68146.appspot.com",
    messagingSenderId: "269005243128",
    appId: "1:269005243128:web:7edfb47194aff2fbec310d",
    measurementId: "G-70EYZBW63L"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const CreateNewUser=async(email,password)=>{
    try{
    const newUser=await createUserWithEmailAndPassword(auth,email,password);
    return{
      firebaseId:newUser.user.uid
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      // Notify the user that the email address is already in use
      return 'Email address is already in use.';
    } else if (error.code === 'auth/weak-password') {
      // Notify the user that the password is too weak
      return 'Password is too weak.';
    } else {
      // Handle other errors
      return 'Something went wrong..';
    }
  }
}

export const SignInExistingUser=async(email,password)=>{
  try {
    const existUser = await signInWithEmailAndPassword(auth, email, password);
      
    // console.log('firebase signin',existUser.user.uid);
    return {
      firebaseId: existUser.user.uid
    }
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // Notify the user that the email address is not associated with any account
      return 'Email not found.';
    } else if (error.code === 'auth/wrong-password') {
      // Notify the user that the password is incorrect
      return 'Password is incorrect.';
    } else {
      // Handle other errors
      return 'Something went wrong..';
    }
  }
}


