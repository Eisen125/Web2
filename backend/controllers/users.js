import User from '../models/usersModel.js'
import { CreateNewUser,SignInExistingUser} from '../firebase.js'

//create new user function
export const newUser=async(req,res)=>{
    // console.log("in user route !");
    // console.log(req.body);
    const {email,password}=req.body;

    // console.log(email + ","+ password);
    //send data to firebase auth users
    const userRes=await CreateNewUser(email,password);
    // console.log(userRes);
    // console.log(userRes.firebaseId)
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
        //console.log(exist.firebaseId);
        if(exist!==undefined){
            return true;
        }
        return false;
}

export const DeleteUser=async(email,password)=>{
    DeleteUserFromFireBase(email,password)
}