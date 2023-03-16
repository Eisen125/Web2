import User from '../models/usersModel.js'
import { CreateNewUser,SignInExistingUser} from '../firebase.js'

//create new user function
export const newUser=async(req,res)=>{
    // console.log("in user route !");
    // console.log(req.body);
    const {email,password}=req.body;

    // console.log(email + ","+ password);
    //send data to firebase auth users
    const userRes = await CreateNewUser(email, password);
    if (typeof userRes !== "string") {
        // console.log(userRes);
        // console.log(userRes.firebaseId)
        //create new user using schema 
        const newUser = new User({
            fireBaseId: userRes.firebaseId,
            name: email,
            email: email,
            password: password
        });
        newUser.save()
        res.send(newUser)
    } else {
        res.send(userRes);
    }
};
export const existUser=async(req,res)=>{
    const {email,password}=req.body;
        const exist=await SignInExistingUser(email,password);
        // console.log(exist.firebaseId);
        if(typeof exist !== "string"){
            
         res.send({"logged":true,"userId":exist.firebaseId});
        }
        else{
            res.send(exist);
        }
    }
       

export const DeleteUser=async(email,password)=>{
    DeleteUserFromFireBase(email,password)
}