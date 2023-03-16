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
export const existUser=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,"email exist");
    console.log(password,"password exist");
        const exist=await SignInExistingUser(email,password);
        // console.log(exist.firebaseId);
        if(exist!==undefined){
            
         res.send({"logged":true,"userId":exist.firebaseId});
        }
        else{
            res.send({"logged":false,"userId":''});
        }
    }
       

export const DeleteUser=async(email,password)=>{
    DeleteUserFromFireBase(email,password)
}