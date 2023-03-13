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
export const existUser=async(user)=>{
    try{
    const res=await axios.post(BASE_URL+'/users/existUser',user)
    console.log(res)
    return res.data
    }catch (error) {
    console.log(error);
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





