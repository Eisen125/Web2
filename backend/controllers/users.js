import User from '../models/usersModel.js'
import { CreateNewUser,SignInExistingUser } from '../firebase.js'


//create new user function
export const newUser=async(req,res)=>{
   try{
    const {email,password,userName}=req.body;
    //send data to firebase auth users
    const userRes=await CreateNewUser(email,password);
    //create new user using schema 
    const newUser=new User({
        fireBaseId:userRes.firebaseId,
        name:userName,
        email:email,
        password:password
    });
    newUser.save()
    res.send(newUser)
   }catch (error) {
    res.send(error);
  }
};

export const existUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const exist=await SignInExistingUser(email,password);
        res.send(exist);
    }catch(error){res.send(error);}
}