
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
  
let app = initializeApp(firebaseConfig);
let auth = getAuth(app);

export const CreateNewUser=async(email,password)=>{
    try{
    const newUser=await createUserWithEmailAndPassword(auth,email,password);
    return{
      firebaseId:newUser.user.uid
    }
    } catch (error) {console.log(error);}
}

export const SignInExistingUser=async(email,password)=>{
    try{
        
        const existUser=await signInWithEmailAndPassword(auth,email,password);
        return{
            firebaseId: existUser.user.uid,
        }
    }catch(error){console.log(error);}
}


