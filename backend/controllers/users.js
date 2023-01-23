import User from '../models/usersModel.js'
import { CreateNewUser,SignInExistingUser } from '../firebase.js'


//create new user function
export const newUser=async(req,res)=>{
   try{
    const exist = User.findOne({email:req.body.email})
    if (exist){
        res.status(402).send('user already exists !')
        
        return;
    }
    console.log("in user route !");
    console.log(req.body);
    const {email,password,userName}=req.body;
    console.log(email + ","+ password);
    //send data to firebase auth users
    const userRes=await CreateNewUser(email,password);
    console.log(userRes);
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