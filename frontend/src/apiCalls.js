import axios from "axios"
const BASE_URL = 'http://localhost:5050'

export const newUser = async(user) => {
try {
    const res = await axios.post(BASE_URL+'/users/newUser',user)
    console.log(user);
    console.log(res,"this is the res from user");
    return res.data
   
} catch (error) {
    console.log(user);
    console.log(error,"this is from api calls",user);
}
}
export const existUser = async (user) => {
    console.log('existuser');
    console.log("this is user from apicalls",user);
 
    try {
        const res = await axios.post(BASE_URL+'/users/existUser',user)
        return res.data
    } catch (error) {
        console.log('error');
        return null;
    }
}
export const DeleteUser=async(user)=>{
    try {
        const res=await axios.delete(BASE_URL+'/users/deleteUser',user)
        return res.data
    } catch (error) {
    console.log(error);
    }
}


export const Findproducts=async(filter)=>{
    try {
        const result=await axios.post(BASE_URL+'/products',filter)
        return result.data
    } catch (error) {
        console.log(error);
    }
}

export const SaveProduct=async(productId)=>{
try{
 const result=await axios.post(BASE_URL+'/products/save',productId)
 return result.data
}catch (error) {
    console.log(error);
}
} 

export const CreateNewOrder=async(userId,cartItem)=>{
    try{
        //console.log({ "userId":userId, "cartItem":cartItem });
        const result = await axios.post(BASE_URL + '/orders/newOrder', { "userId":userId, "cartItem":cartItem })
        return result.data;
    }catch(error){
        console.log(error);
    }
}

export const DeleteOrder=async(userId,cartItem)=>{
    try{
        const res=await axios.delete(BASE_URL+'/orders/deleteOrder',{ "userId":userId, "cartItem":cartItem })
        return res.data;
    }catch(error){
        console.log(error);
    }
}




