import axios from "axios"
const BASE_URL = 'http://localhost:5050'

export const newUser = async(user) => {
try {
    const res = await axios.post(BASE_URL+'/users/newUser',user)
    console.log(user);
    console.log(res,"this is the res from user");
    return res.data
   
} catch (error) {
    //console.log(error, "this is from api calls", user);
    return error
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
        return error;
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
        const result = await axios.post(BASE_URL + '/products', { "filter":filter })
        return result.data
    } catch (error) {
        console.log(error);
    }
}


export const UpdateProduct=async(productId)=>{
    try{
        const res=await axios.post(BASE_URL+'/products/updateProduct',productId)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const CreateNewOrder=async(userId,cartItem)=>{
    try{
       
        const result = await axios.post(BASE_URL + '/orders/newOrder', { "userId": userId, "cartItem": cartItem });
        return result.data;
    }catch(error){
        console.log(error);
    }
}

export const ReduceQuantity=async(userId,cartItem)=>{
    try{
        const result = await axios.post(BASE_URL + '/orders/ReduceQuantity', { "userId": userId, "cartItem": cartItem });
        return result.data;
    }catch(error){
        console.log(error);
    }
}

export const GetAllOrders = async (userId) => {
    try {
        const result = await axios.post(BASE_URL + '/orders/GetAllOrders', { "userId": userId });
        return result.data;
    } catch (error) {
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

export const RemoveOrderItem=async(userId,cartItem)=>{
    try{
        const res=await axios.post(BASE_URL+'/orders/RemoveOrderItem',{ "userId":userId, "cartItem":cartItem })
        return res.data;
    }catch(error){
        console.log(error);
    }
}



