import User from '../models/usersModel.js'
import { CreateNewUser,SignInExistingUser} from '../firebase.js'
import { async } from '@firebase/util';
//create new user function
export const newUser=async(req,res)=>{
    console.log("in user route !");
    console.log(req.body);
    const {email,password}=req.body;
    if(existUser(req.body.email,req.body.password)){
       res.send('user exist')
       return;
    }
    console.log(email + ","+ password);
    //send data to firebase auth users
    const userRes=await CreateNewUser(email,password);
    console.log(userRes);
    //create new user using schema 
    const newUser=new User({
        fireBaseId:userRes.firebaseId,
        name:email,
        email:email,
        password:password
    });
    newUser.save()
    res.send(newUser)
};
export const existUser=async(email,password)=>{
        const exist=await SignInExistingUser(email,password);
        if(exist!==undefined){
            console.log(exist,'alredy exist');
            return true;
        }
        return false;
}

export const DeleteUser=async(email,password)=>{
    DeleteUserFromFireBase(email,password)
}